import { useState } from 'react'
import { X, Heart, ChevronRight, ChevronLeft, Zap } from 'lucide-react'

// ─── Data ───────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    emoji: '🕯️', color: '#00D166', bg: '#e8fff4',
    title: 'Apa itu Candlestick?',
    content: 'Candlestick adalah grafik yang menampilkan pergerakan harga saham dalam satu periode waktu. Setiap "lilin" merangkum empat angka penting: harga buka, harga tutup, tertinggi, dan terendah.',
    visual: (
      <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
        <line x1="60" y1="10" x2="60" y2="40" stroke="#00D166" strokeWidth="3" strokeLinecap="round"/>
        <rect x="35" y="40" width="50" height="80" rx="4" fill="#00D166"/>
        <line x1="60" y1="120" x2="60" y2="150" stroke="#00D166" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    emoji: '📐', color: '#7C4DFF', bg: '#f0ebff',
    title: 'Anatomi Candlestick',
    content: 'Body (badan) adalah kotak besar yang menunjukkan rentang harga buka–tutup. Wick / Shadow (ekor) adalah garis tipis di atas dan bawah body yang menunjukkan harga tertinggi dan terendah.',
    visual: (
      <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
        <line x1="60" y1="5" x2="60" y2="45" stroke="#7C4DFF" strokeWidth="3" strokeLinecap="round"/>
        <rect x="32" y="45" width="56" height="90" rx="5" fill="#7C4DFF"/>
        <line x1="60" y1="135" x2="60" y2="175" stroke="#7C4DFF" strokeWidth="3" strokeLinecap="round"/>
        <text x="72" y="18" fill="#7C4DFF" fontSize="11" fontWeight="700">High</text>
        <text x="72" y="95" fill="#7C4DFF" fontSize="11" fontWeight="700">Body</text>
        <text x="72" y="162" fill="#7C4DFF" fontSize="11" fontWeight="700">Low</text>
      </svg>
    )
  },
  {
    emoji: '🐂', color: '#FF6B35', bg: '#fff3ee',
    title: 'Bullish vs Bearish',
    content: 'Candlestick HIJAU (Bullish) = harga NAIK. Harga penutupan lebih tinggi dari harga pembukaan. Candlestick MERAH (Bearish) = harga TURUN. Ini adalah sinyal paling dasar di pasar saham!',
    visual: (
      <svg width="140" height="160" viewBox="0 0 140 160" fill="none">
        <line x1="40" y1="15" x2="40" y2="40" stroke="#00D166" strokeWidth="3" strokeLinecap="round"/>
        <rect x="22" y="40" width="36" height="80" rx="4" fill="#00D166"/>
        <line x1="40" y1="120" x2="40" y2="145" stroke="#00D166" strokeWidth="3" strokeLinecap="round"/>
        <text x="20" y="158" fill="#00D166" fontSize="10" fontWeight="800">BULLISH ↑</text>
        <line x1="100" y1="15" x2="100" y2="40" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
        <rect x="82" y="40" width="36" height="80" rx="4" fill="#ef4444"/>
        <line x1="100" y1="120" x2="100" y2="145" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
        <text x="80" y="158" fill="#ef4444" fontSize="10" fontWeight="800">BEARISH ↓</text>
      </svg>
    )
  },
  {
    emoji: '🔨', color: '#FFC107', bg: '#fffbea',
    title: 'Pola Dasar: Hammer',
    content: 'Hammer adalah pola candlestick dengan ekor bawah sangat panjang dan body kecil di bagian atas. Ini sering menjadi sinyal kuat bahwa tren turun akan BERBALIK menjadi naik!',
    visual: (
      <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
        <rect x="42" y="30" width="36" height="30" rx="4" fill="#FFC107"/>
        <line x1="60" y1="60" x2="60" y2="160" stroke="#FFC107" strokeWidth="4" strokeLinecap="round"/>
        <text x="22" y="175" fill="#FFC107" fontSize="12" fontWeight="800">HAMMER 🔨</text>
      </svg>
    )
  },
]

const QUESTIONS = [
  {
    type: 'choice',
    xp: 20,
    question: 'Warna candlestick apakah yang menunjukkan harga NAIK (Bullish)?',
    options: ['🔴  Merah', '🟢  Hijau', '⚪  Abu-abu', '🔵  Biru'],
    correct: 1,
    explanation: 'Tepat! Candlestick HIJAU artinya harga penutupan lebih tinggi dari harga pembukaan.'
  },
  {
    type: 'match',
    xp: 30,
    question: 'Cocokkan istilah candlestick dengan artinya!',
    pairs: [
      { term: 'Body', def: 'Rentang harga buka–tutup' },
      { term: 'Wick', def: 'Harga tertinggi & terendah' },
      { term: 'Bullish', def: 'Harga naik (hijau)' },
      { term: 'Bearish', def: 'Harga turun (merah)' },
    ],
    explanation: 'Luar biasa! Kamu sudah paham semua istilah dasar candlestick.'
  },
  {
    type: 'choice',
    xp: 20,
    question: 'Apa nama garis tipis di atas dan bawah body candlestick?',
    options: ['Volume Bar', 'Trendline', 'Shadow / Wick', 'Moving Average'],
    correct: 2,
    explanation: 'Benar sekali! Garis tipis itu disebut Shadow atau Wick (ekor).'
  },
]

// ─── Mini Guidebook ──────────────────────────────────────────────────────────

function Guidebook({ onFinish, onClose }) {
  const [idx, setIdx] = useState(0)
  const slide = SLIDES[idx]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Story progress bars */}
      <div style={{ display: 'flex', gap: 6, padding: '0 0 20px 0' }}>
        {SLIDES.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 9999, background: i <= idx ? slide.color : '#e2e5ea', transition: 'background 0.3s' }} />
        ))}
      </div>

      {/* Slide content */}
      <div style={{
        flex: 1, background: slide.bg, borderRadius: 20, padding: 32,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', gap: 16, transition: 'background 0.3s', minHeight: 300
      }}>
        <div style={{ fontSize: 56, lineHeight: 1 }}>{slide.emoji}</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: 0 }}>{slide.title}</h2>
        <div style={{ marginTop: 8 }}>{slide.visual}</div>
        <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.7, maxWidth: 380, margin: 0 }}>{slide.content}</p>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        {idx > 0 && (
          <button onClick={() => setIdx(i => i - 1)} style={{
            flex: 1, padding: '14px 0', borderRadius: 14, border: '2px solid #e2e5ea',
            background: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer', color: '#374151',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            <ChevronLeft size={18} /> Kembali
          </button>
        )}
        <button onClick={idx < SLIDES.length - 1 ? () => setIdx(i => i + 1) : onFinish} style={{
          flex: 2, padding: '14px 0', borderRadius: 14, border: 'none',
          background: slide.color, color: 'white', fontWeight: 800, fontSize: 15,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          boxShadow: `0 6px 0 ${slide.color}99`
        }}>
          {idx < SLIDES.length - 1 ? 'Lanjut' : '🎯 Mulai Kuis!'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

// ─── Quiz ────────────────────────────────────────────────────────────────────

function Quiz({ onFinish, onClose }) {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [matched, setMatched] = useState({})
  const [activeTerm, setActiveTerm] = useState(null)
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong'
  const [hearts, setHearts] = useState(3)
  const [totalXP, setTotalXP] = useState(0)

  const q = QUESTIONS[qIdx]

  function handleChoice(i) {
    if (feedback) return
    setSelected(i)
    if (i === q.correct) {
      setFeedback('correct')
      setTotalXP(x => x + q.xp)
    } else {
      setFeedback('wrong')
      setHearts(h => Math.max(0, h - 1))
    }
  }

  function handleMatchTerm(term) { setActiveTerm(term) }

  function handleMatchDef(def) {
    if (!activeTerm) return
    const pair = q.pairs.find(p => p.term === activeTerm)
    const newMatched = { ...matched, [activeTerm]: def }
    setMatched(newMatched)
    setActiveTerm(null)
    if (Object.keys(newMatched).length === q.pairs.length) {
      const allCorrect = q.pairs.every(p => newMatched[p.term] === p.def)
      setFeedback(allCorrect ? 'correct' : 'wrong')
      if (allCorrect) setTotalXP(x => x + q.xp)
      else setHearts(h => Math.max(0, h - 1))
    }
  }

  function next() {
    if (qIdx < QUESTIONS.length - 1) {
      setQIdx(i => i + 1); setSelected(null); setMatched({}); setActiveTerm(null); setFeedback(null)
    } else { onFinish(totalXP) }
  }

  const isCorrect = feedback === 'correct'
  const feedbackBg = isCorrect ? '#e8fff4' : '#fff1f1'
  const feedbackColor = isCorrect ? '#00a652' : '#ef4444'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 8, background: '#e2e5ea', borderRadius: 9999 }}>
          <div style={{ width: `${((qIdx) / QUESTIONS.length) * 100}%`, height: '100%', background: '#00D166', borderRadius: 9999, transition: 'width 0.4s' }} />
        </div>
        {[...Array(3)].map((_, i) => (
          <Heart key={i} size={20} fill={i < hearts ? '#ef4444' : 'none'} color={i < hearts ? '#ef4444' : '#d1d5db'} />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800, color: '#FFC107', fontSize: 14 }}>
          <Zap size={16} fill="#FFC107" color="#FFC107" /> {totalXP} XP
        </div>
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>
        Pertanyaan {qIdx + 1} dari {QUESTIONS.length}
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: '0 0 24px', lineHeight: 1.4 }}>{q.question}</h2>

      {/* Multiple Choice */}
      {q.type === 'choice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === i
            const isRight = feedback && i === q.correct
            const isWrong = feedback && isSelected && i !== q.correct
            return (
              <button key={i} onClick={() => handleChoice(i)} style={{
                padding: '16px 20px', borderRadius: 14, fontWeight: 700, fontSize: 15, cursor: feedback ? 'default' : 'pointer',
                textAlign: 'left', border: '2px solid',
                borderColor: isRight ? '#00D166' : isWrong ? '#ef4444' : isSelected ? '#7C4DFF' : '#e2e5ea',
                background: isRight ? '#e8fff4' : isWrong ? '#fff1f1' : isSelected ? '#f3eeff' : 'white',
                color: isRight ? '#00a652' : isWrong ? '#ef4444' : '#111827',
                transform: isSelected && !feedback ? 'scale(1.01)' : 'none',
                transition: 'all 0.15s'
              }}>
                {isRight ? '✅ ' : isWrong ? '❌ ' : ''}{opt}
              </button>
            )
          })}
        </div>
      )}

      {/* Match / Drag-like */}
      {q.type === 'match' && (
        <div style={{ display: 'flex', gap: 16 }}>
          {/* Terms */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Istilah</p>
            {q.pairs.map(p => {
              const isActive = activeTerm === p.term
              const isDone = matched[p.term]
              const isCorrectMatch = feedback && matched[p.term] === p.def
              const isWrongMatch = feedback && matched[p.term] && matched[p.term] !== p.def
              return (
                <button key={p.term} onClick={() => !isDone && !feedback && handleMatchTerm(p.term)} style={{
                  padding: '12px 14px', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: isDone || feedback ? 'default' : 'pointer',
                  border: '2px solid', textAlign: 'left',
                  borderColor: isCorrectMatch ? '#00D166' : isWrongMatch ? '#ef4444' : isActive ? '#7C4DFF' : isDone ? '#c8cdd6' : '#e2e5ea',
                  background: isCorrectMatch ? '#e8fff4' : isWrongMatch ? '#fff1f1' : isActive ? '#f3eeff' : isDone ? '#f9fafb' : 'white',
                  color: isCorrectMatch ? '#00a652' : isWrongMatch ? '#ef4444' : isActive ? '#7C4DFF' : '#111827',
                  opacity: isDone && !feedback ? 0.7 : 1
                }}>
                  {p.term}
                </button>
              )
            })}
          </div>
          {/* Defs */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Arti</p>
            {q.pairs.map(p => {
              const isUsed = Object.values(matched).includes(p.def)
              return (
                <button key={p.def} onClick={() => !isUsed && !feedback && handleMatchDef(p.def)} style={{
                  padding: '12px 14px', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: isUsed || feedback ? 'default' : 'pointer',
                  border: '2px dashed', textAlign: 'left',
                  borderColor: activeTerm && !isUsed ? '#7C4DFF' : '#e2e5ea',
                  background: isUsed ? '#f3eeff' : 'white',
                  color: isUsed ? '#7C4DFF' : '#374151', opacity: isUsed ? 0.7 : 1
                }}>
                  {p.def}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Feedback bar */}
      {feedback && (
        <div style={{
          marginTop: 24, padding: '18px 20px', borderRadius: 16,
          background: feedbackBg, border: `2px solid ${feedbackColor}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: feedbackColor, fontSize: 16 }}>
              {isCorrect ? '🎉 Luar Biasa!' : '❌ Belum Tepat'}
            </p>
            <p style={{ margin: '4px 0 0', color: '#374151', fontSize: 13 }}>{q.explanation}</p>
          </div>
          <button onClick={next} style={{
            padding: '12px 24px', borderRadius: 12, border: 'none',
            background: feedbackColor, color: 'white', fontWeight: 800, fontSize: 15,
            cursor: 'pointer', boxShadow: `0 4px 0 ${feedbackColor}88`, whiteSpace: 'nowrap', marginLeft: 16
          }}>
            {qIdx < QUESTIONS.length - 1 ? 'Lanjut →' : 'Selesai 🏆'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Finish Screen ────────────────────────────────────────────────────────────

function FinishScreen({ xp, onClose }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 20 }}>
      <div style={{ fontSize: 80 }}>🏆</div>
      <h2 style={{ fontSize: 28, fontWeight: 900, color: '#111827', margin: 0 }}>Pelajaran Selesai!</h2>
      <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>Kamu telah menyelesaikan <strong>Candlestick Basic</strong></p>
      <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
        <div style={{ padding: '16px 24px', background: '#fffbea', borderRadius: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 28, color: '#FFC107' }}>{xp}</div>
          <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 700 }}>XP Didapat</div>
        </div>
        <div style={{ padding: '16px 24px', background: '#e8fff4', borderRadius: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 28, color: '#00D166' }}>⭐⭐⭐</div>
          <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 700 }}>Bintang</div>
        </div>
      </div>
      <button onClick={onClose} style={{
        marginTop: 8, padding: '16px 48px', borderRadius: 16, border: 'none',
        background: '#00D166', color: 'white', fontWeight: 900, fontSize: 17,
        cursor: 'pointer', boxShadow: '0 6px 0 #00a652'
      }}>
        Kembali ke Peta Belajar
      </button>
    </div>
  )
}

// ─── Main LessonModal ─────────────────────────────────────────────────────────

export default function LessonModal({ onClose }) {
  const [phase, setPhase] = useState('guide') // 'guide' | 'quiz' | 'finish'
  const [earnedXP, setEarnedXP] = useState(0)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 28, width: '100%', maxWidth: 560,
        maxHeight: '90vh', overflowY: 'auto',
        padding: 32, position: 'relative',
        boxShadow: '0 32px 80px rgba(0,0,0,0.25)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {phase === 'guide' ? '📖 Mini Guidebook' : phase === 'quiz' ? '⚔️ Arena Kuis' : '🏆 Selesai'}
            </div>
            <div style={{ fontWeight: 900, fontSize: 20, color: '#111827', marginTop: 2 }}>Candlestick Basic</div>
          </div>
          <button onClick={onClose} style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#6b7280'
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        {phase !== 'finish' && (
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {[['guide', '📖 Materi'], ['quiz', '⚔️ Kuis']].map(([key, label]) => (
              <button key={key} onClick={() => setPhase(key)} style={{
                flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: 14,
                background: phase === key ? 'white' : 'transparent',
                color: phase === key ? '#111827' : '#9ca3af',
                cursor: 'pointer', boxShadow: phase === key ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s'
              }}>{label}</button>
            ))}
          </div>
        )}

        {phase === 'guide' && <Guidebook onFinish={() => setPhase('quiz')} onClose={onClose} />}
        {phase === 'quiz' && <Quiz onFinish={(xp) => { setEarnedXP(xp); setPhase('finish') }} onClose={onClose} />}
        {phase === 'finish' && <FinishScreen xp={earnedXP} onClose={onClose} />}
      </div>
    </div>
  )
}
