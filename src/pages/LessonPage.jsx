import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Heart, X, Zap, Trophy } from 'lucide-react'
import { useLesson } from '../hooks/useCurriculum'
import { useProgress } from '../hooks/useProgress'

// ─── Sub-components ───────────────────────────────────────────────────────────

function SlideCard({ slide }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px', maxWidth: 680, margin: '0 auto', width: '100%' }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '2px', color: '#7C4DFF', marginBottom: 12 }}>
        {slide.tag || 'MATERI'}
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111827', textAlign: 'center', margin: '0 0 24px', lineHeight: 1.3 }}>
        {slide.title}
      </h1>
      <div style={{ fontSize: 100, marginBottom: 28 }}>{slide.visual_emoji || '📖'}</div>
      <p style={{ fontSize: 17, color: '#374151', textAlign: 'center', lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
        {slide.body}
      </p>
    </div>
  )
}

function ChoiceQuestion({ q, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)

  function pick(i) {
    if (locked) return
    setSelected(i)
    setLocked(true)
    setTimeout(() => onAnswer(q.options[i].is_correct), 900)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 40px', maxWidth: 680, margin: '0 auto', width: '100%', justifyContent: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '2px', color: q.tag_color || '#7C4DFF', marginBottom: 12 }}>{q.tag}</div>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#111827', margin: '0 0 36px', lineHeight: 1.4 }}>{q.question}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {q.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = locked && isSelected && opt.is_correct
          const isWrong = locked && isSelected && !opt.is_correct
          const isRight = locked && !isSelected && opt.is_correct
          return (
            <button key={opt.id || i} onClick={() => pick(i)} style={{
              padding: '20px 16px', borderRadius: 16,
              border: `3px solid ${isCorrect || isRight ? '#00D166' : isWrong ? '#ef4444' : isSelected ? '#7C4DFF' : '#e2e5ea'}`,
              background: isCorrect || isRight ? '#e8fff4' : isWrong ? '#fff1f1' : isSelected ? '#f3eeff' : 'white',
              cursor: locked ? 'default' : 'pointer', textAlign: 'center',
              fontWeight: 700, fontSize: 16, color: '#111827',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              transition: 'all 0.15s', transform: isSelected && !locked ? 'scale(1.02)' : 'scale(1)',
              boxShadow: isSelected ? '0 4px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <span style={{ fontSize: 28 }}>{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MatchQuestion({ q, onAnswer }) {
  const [matched, setMatched] = useState({})
  const [active, setActive] = useState(null)
  const [done, setDone] = useState(false)

  function pickTerm(term) { if (!done) setActive(term) }
  function pickDef(def) {
    if (!active || done) return
    const newM = { ...matched, [active]: def }
    setMatched(newM)
    setActive(null)
    if (Object.keys(newM).length === q.match_pairs.length) {
      setDone(true)
      const correct = q.match_pairs.every(p => newM[p.term] === p.definition)
      setTimeout(() => onAnswer(correct), 700)
    }
  }

  const usedDefs = Object.values(matched)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 40px', maxWidth: 680, margin: '0 auto', width: '100%', justifyContent: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '2px', color: q.tag_color || '#FF6B35', marginBottom: 12 }}>{q.tag}</div>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', margin: '0 0 32px', lineHeight: 1.4 }}>{q.question}</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.match_pairs.map(p => {
            const isActive = active === p.term
            const isDone = matched[p.term]
            return (
              <button key={p.term} onClick={() => !isDone && pickTerm(p.term)} style={{
                padding: '14px 18px', borderRadius: 14, fontWeight: 700, fontSize: 15,
                border: `2px solid ${isActive ? '#7C4DFF' : isDone ? '#00D166' : '#e2e5ea'}`,
                background: isActive ? '#f3eeff' : isDone ? '#e8fff4' : 'white',
                color: isActive ? '#7C4DFF' : isDone ? '#00a652' : '#111827',
                cursor: isDone ? 'default' : 'pointer', textAlign: 'left',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.15s'
              }}>{p.term}</button>
            )
          })}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.match_pairs.map(p => {
            const isUsed = usedDefs.includes(p.definition)
            return (
              <button key={p.definition} onClick={() => !isUsed && pickDef(p.definition)} style={{
                padding: '14px 18px', borderRadius: 14, fontWeight: 700, fontSize: 14,
                border: `2px dashed ${active && !isUsed ? '#7C4DFF' : '#e2e5ea'}`,
                background: isUsed ? '#f3eeff' : 'white',
                color: isUsed ? '#7C4DFF' : '#374151',
                cursor: isUsed ? 'default' : 'pointer', textAlign: 'left',
                opacity: isUsed ? 0.75 : 1, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.15s'
              }}>{p.definition}</button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Main LessonPage ──────────────────────────────────────────────────────────

export default function LessonPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { lesson, slides, questions, loading } = useLesson(lessonId)
  const { saveProgress } = useProgress()

  // Jika URL mengandung ?skipToQuiz=true, langsung mulai dari fase kuis
  const skipToQuiz = new URLSearchParams(location.search).get('skipToQuiz') === 'true'

  const [phase, setPhase] = useState(skipToQuiz ? 'quiz' : 'guide')
  const [slideIdx, setSlideIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [hearts, setHearts] = useState(5)
  const [xp, setXp] = useState(0)
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [qKey, setQKey] = useState(0)
  const savedRef = useRef(false) // Mencegah double-save

  // Reset semua state ketika berpindah ke lesson baru
  useEffect(() => {
    savedRef.current = false
    setPhase(skipToQuiz ? 'quiz' : 'guide')
    setSlideIdx(0)
    setQIdx(0)
    setHearts(5)
    setXp(0)
    setFeedback(null)
    setQKey(0)
  }, [lessonId, skipToQuiz])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontWeight: 800, color: '#00D166', fontSize: 24 }}>Menyiapkan Materi...</div>
    </div>
  )

  if (!lesson) return <div>Pelajaran tidak ditemukan.</div>

  // Hitung ID lesson berikutnya (format lesson: l{level}-{urutan})
  const getNextLessonInfo = () => {
    const parts = lessonId.split('-')
    const levelNum = parseInt(parts[0].replace('l', ''))
    const lessonNum = parseInt(parts[1])
    return `l${levelNum}-${lessonNum + 1}`
  }

  const totalSteps = slides.length + questions.length
  const currentStep = phase === 'guide' ? slideIdx : phase === 'quiz' ? slides.length + qIdx : totalSteps
  const progress = (currentStep / totalSteps) * 100

  function nextSlide() {
    if (slideIdx < slides.length - 1) setSlideIdx(i => i + 1)
    else setPhase('quiz')
  }

  function handleAnswer(correct) {
    if (correct) {
      setXp(x => x + (questions[qIdx].xp || 20))
      setFeedback('correct')
    } else {
      setHearts(h => Math.max(0, h - 1))
      setFeedback('wrong')
    }
  }

  function nextQuestion() {
    setFeedback(null)
    setQKey(k => k + 1)
    if (qIdx < questions.length - 1) setQIdx(i => i + 1)
    else {
      // Simpan progres ke Supabase ketika semua soal selesai
      if (!savedRef.current) {
        savedRef.current = true
        saveProgress(lessonId, xp + (questions[qIdx].xp || 20))
      }
      setPhase('finish')
    }
  }

  const q = questions[qIdx]
  const isCorrect = feedback === 'correct'

  // ── FINISH SCREEN ────────────────────────────────────────────────────────
  if (phase === 'finish') {
    const nextId = getNextLessonInfo()
    return (
      <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: 40 }}>
        <div style={{ fontSize: 100 }}><Trophy size={100} color="#FFC107" /></div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#111827', margin: 0 }}>Luar Biasa!</h1>
        <p style={{ fontSize: 18, color: '#6b7280', margin: 0 }}>Kamu menyelesaikan <strong>{lesson.title}</strong></p>
        <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
          <div style={{ padding: '20px 32px', background: '#fffbea', borderRadius: 20, textAlign: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: 36, color: '#FFC107' }}>{xp}</div>
            <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 700, marginTop: 4 }}>XP Didapat</div>
          </div>
          <div style={{ padding: '20px 32px', background: '#e8fff4', borderRadius: 20, textAlign: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: 36, color: '#00D166' }}>{hearts}</div>
            <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 700, marginTop: 4 }}>Nyawa Tersisa ❤️</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate(`/lesson/${nextId}`)} style={{
            marginTop: 12, padding: '18px 40px', borderRadius: 16, border: 'none',
            background: '#00D166', color: 'white', fontWeight: 900, fontSize: 18,
            cursor: 'pointer', boxShadow: '0 6px 0 #00a652',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            Pelajaran Berikutnya →
          </button>
          <button onClick={() => navigate('/dashboard')} style={{
            marginTop: 12, padding: '18px 40px', borderRadius: 16,
            border: '2px solid #e2e5ea', background: 'white',
            color: '#6b7280', fontWeight: 700, fontSize: 16, cursor: 'pointer'
          }}>
            Kembali ke Peta 🗺️
          </button>
        </div>
      </div>
    )
  }

  // ── MAIN LESSON LAYOUT ───────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top Bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 32px', borderBottom: '2px solid #f3f4f6' }}>
        <button onClick={() => navigate('/dashboard')} style={{
          width: 40, height: 40, borderRadius: 12, border: '2px solid #e2e5ea',
          background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#6b7280', flexShrink: 0
        }}>
          <X size={20} />
        </button>

        {/* Progress bar */}
        <div style={{ flex: 1, height: 16, background: '#e2e5ea', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{
            width: `${progress}%`, height: '100%',
            background: 'linear-gradient(90deg, #00D166, #00f076)',
            borderRadius: 9999, transition: 'width 0.5s ease'
          }} />
        </div>

        {/* Hearts & XP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 18, color: '#ef4444' }}>
            <Heart size={22} fill="#ef4444" color="#ef4444" />
            {hearts}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800, fontSize: 15, color: '#FFC107' }}>
            <Zap size={18} fill="#FFC107" color="#FFC107" /> {xp} XP
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>

        {/* Guidebook Slides */}
        {phase === 'guide' && slides.length > 0 && (
          <SlideCard slide={slides[slideIdx]} />
        )}

        {/* Quiz Questions */}
        {phase === 'quiz' && questions.length > 0 && (
          q.type === 'choice'
            ? <ChoiceQuestion key={qKey} q={q} onAnswer={handleAnswer} />
            : <MatchQuestion key={qKey} q={q} onAnswer={handleAnswer} />
        )}
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{
        padding: '20px 40px', borderTop: '2px solid #f3f4f6',
        background: feedback
          ? (isCorrect ? '#e8fff4' : '#fff1f1')
          : 'white',
        transition: 'background 0.3s'
      }}>
        {feedback ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 680, margin: '0 auto', width: '100%' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 18, color: isCorrect ? '#00a652' : '#ef4444' }}>
                {isCorrect ? '🎉 Luar Biasa!' : '💔 Belum Tepat'}
              </p>
              <p style={{ margin: '4px 0 0', color: '#374151', fontSize: 14 }}>{q.explanation}</p>
            </div>
            <button onClick={nextQuestion} style={{
              padding: '16px 40px', borderRadius: 16, border: 'none', fontWeight: 900, fontSize: 16,
              background: isCorrect ? '#00D166' : '#ef4444', color: 'white', cursor: 'pointer',
              boxShadow: isCorrect ? '0 5px 0 #00a652' : '0 5px 0 #c81e1e', flexShrink: 0, marginLeft: 24
            }}>
              {qIdx < questions.length - 1 ? 'LANJUT →' : 'SELESAI 🏆'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 680, margin: '0 auto', width: '100%' }}>
            <button onClick={() => navigate('/dashboard')} style={{
              padding: '16px 32px', borderRadius: 16, border: '2px solid #e2e5ea',
              background: 'white', color: '#9ca3af', fontWeight: 800, fontSize: 15, cursor: 'pointer'
            }}>
              KELUAR
            </button>
            {phase === 'guide' && (
              <button onClick={nextSlide} style={{
                padding: '16px 48px', borderRadius: 16, border: 'none',
                background: '#00D166', color: 'white', fontWeight: 900, fontSize: 16,
                cursor: 'pointer', boxShadow: '0 5px 0 #00a652'
              }}>
                {slideIdx < slides.length - 1 ? 'LANJUT →' : '⚔️ MULAI KUIS'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
