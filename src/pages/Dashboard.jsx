<<<<<<< HEAD
import { Star, TrendingUp, Lock, Wallet } from 'lucide-react'
import RightSidebar from '../components/RightSidebar'

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
      
      {/* Center Column: Learning Path */}
      <div style={{ flex: 1, paddingBottom: 100 }}>
        
        {/* Header Banner */}
        <div style={{
          background: '#e2e5ea',
          borderRadius: 24,
          padding: 32,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 48
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 8, position: 'relative', zIndex: 2 }}>
            Pelajaran Saham Hari Ini
          </h2>
          <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.6, maxWidth: '70%', position: 'relative', zIndex: 2 }}>
            Lanjutkan perjalanan Anda untuk menjadi investor handal. Selesaikan unit "Dasar-Dasar Candlestick" untuk bonus XP.
          </p>
          
          {/* Decorative Stars/Chart in background */}
          <div style={{ position: 'absolute', right: 20, bottom: 20, display: 'flex', gap: 10, opacity: 0.3 }}>
            <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 60L30 40L50 50L80 20" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M60 20H80V40" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ position: 'absolute', top: -10, left: 20, fontSize: 32 }}>✨</div>
          </div>
        </div>

        {/* Nodes / Path Container */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>
          
          {/* Node 1: Candlestick Basic (Active) */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Dashed line down right */}
            <div style={{ position: 'absolute', top: 100, left: '50%', width: 100, height: 80, borderRight: '4px dashed #c8cdd6', borderBottom: '4px dashed #c8cdd6', borderBottomRightRadius: 20, zIndex: 0 }} />
            
            <div style={{
              position: 'relative', zIndex: 1, width: 100, height: 100, borderRadius: '50%',
              background: '#00D166', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 0 #00a652, 0 16px 24px rgba(0,209,102,0.3)',
              cursor: 'pointer', transition: 'transform 0.2s'
            }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              {/* Progress Ring */}
              <svg style={{ position: 'absolute', top: -10, left: -10, width: 120, height: 120 }}>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6fff2" strokeWidth="8" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#00D166" strokeWidth="8" strokeDasharray="339" strokeDashoffset="100" strokeLinecap="round" />
              </svg>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21V10"/><path d="M15 21v-4"/><path d="M9 3v3"/><path d="M15 3v2"/><path d="M7 6h4v4H7z"/><path d="M13 5h4v4h-4z"/></svg>
            </div>
            <div style={{ marginTop: 20, fontWeight: 800, fontSize: 15, color: '#111827' }}>Candlestick Basic</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              <Star size={14} fill="#FFC107" color="#FFC107" />
              <Star size={14} fill="#FFC107" color="#FFC107" />
              <Star size={14} fill="none" color="#c8cdd6" />
            </div>
          </div>

          {/* Node 2: Bull & Bear (Mastered) */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 160 }}>
            {/* Dashed line down left */}
            <div style={{ position: 'absolute', top: 90, right: '50%', width: 120, height: 100, borderLeft: '4px dashed #c8cdd6', borderBottom: '4px dashed #c8cdd6', borderBottomLeftRadius: 20, zIndex: 0 }} />
            
            <div style={{
              position: 'relative', zIndex: 1, width: 90, height: 90, borderRadius: '50%',
              background: '#7C4DFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 0 #5a2dcc'
            }}>
              <TrendingUp size={32} color="white" strokeWidth={2.5} />
            </div>
            <div style={{ marginTop: 16, fontWeight: 800, fontSize: 15, color: '#111827' }}>Bull & Bear</div>
            <div style={{ marginTop: 4, fontSize: 11, fontWeight: 800, color: '#7C4DFF', letterSpacing: '1px' }}>MASTERED</div>
          </div>

          {/* Node 3: Money Bag 101 */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -80 }}>
            <div style={{
              position: 'relative', zIndex: 1, width: 90, height: 90, borderRadius: '50%',
              background: '#FFC107', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 0 #ff8f00'
            }}>
              <Wallet size={32} color="white" strokeWidth={2.5} />
            </div>
            <div style={{ marginTop: 16, fontWeight: 800, fontSize: 15, color: '#111827' }}>Money Bag 101</div>
            {/* Mini Progress bar */}
            <div style={{ width: 60, height: 6, background: '#e2e5ea', borderRadius: 9999, marginTop: 8 }}>
              <div style={{ width: '40%', height: '100%', background: '#FFC107', borderRadius: 9999 }} />
            </div>
          </div>

          {/* Node 4: Locked */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
            <div style={{
              position: 'relative', zIndex: 1, width: 90, height: 90, borderRadius: '50%',
              background: '#c8cdd6', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 0 #a0a8b5'
            }}>
              <Lock size={30} color="#6b7280" />
            </div>
            <div style={{ marginTop: 16, fontWeight: 800, fontSize: 15, color: '#6b7280' }}>Balance Scale</div>
            <div style={{ marginTop: 4, fontSize: 11, color: '#a0a8b5' }}>Unlock Level 5</div>
          </div>

        </div>
      </div>

      {/* Right Column: Widgets */}
      <RightSidebar />
      
=======
import React from 'react'
import { Lock, Zap, Database, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLevels } from '../hooks/useCurriculum'
import { seedCurriculum } from '../data/seedCurriculum'
import RightSidebar from '../components/RightSidebar'
import { useProgress } from '../hooks/useProgress'

// Geometry Constants
const CW = 460
const CX = CW / 2
const NODE_R = 45
const VERTICAL_GAP = 140
const HORIZONTAL_OFFSET = 120
const PR = 22 // corner radius
const DASH = { stroke: '#c8cdd6', strokeWidth: 3, strokeDasharray: '8 6', fill: 'none', strokeLinecap: 'round' }

// Helper to calculate node position in a zigzag
function getNodePos(index) {
  const row = index
  const y = row * VERTICAL_GAP
  let x = CX
  if (row % 4 === 1) x = CX + HORIZONTAL_OFFSET
  if (row % 4 === 3) x = CX - HORIZONTAL_OFFSET
  return { cx: x, cy: y, r: NODE_R, top: y }
}

// SVG Path builder for zigzag
function makePath(A, B) {
  const ax = A.cx, ay = A.cy + A.r
  const bx = B.cx, by = B.cy - B.r
  const midY = ay + (by - ay) / 2
  const goRight = bx > ax
  const goLeft = bx < ax
  
  if (ax === bx) {
    return `M ${ax} ${ay} L ${bx} ${by}`
  }

  const qx1 = ax, qy1 = midY, qx2 = goRight ? ax + PR : ax - PR, qy2 = midY
  const qx3 = bx, qy3 = midY, qx4 = goRight ? bx - PR : bx + PR, qy4 = midY

  return [
    `M ${ax} ${ay}`,
    `L ${ax} ${midY - PR}`,
    `Q ${ax} ${midY} ${qx2} ${midY}`,
    `L ${qx4} ${midY}`,
    `Q ${bx} ${midY} ${bx} ${midY + PR}`,
    `L ${bx} ${by}`,
  ].join(' ')
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { levels, loading, error: fetchError } = useLevels()
  const { completedLessons, totalXp, loading: progressLoading } = useProgress()
  const [seeding, setSeeding] = React.useState(false)

  // Auto-seed if database is empty

  React.useEffect(() => {
    async function autoSeed() {
      if (!loading && levels.length === 0 && !seeding) {
        // Mencegah infinite loop jika database gagal menyimpan/membaca data
        if (sessionStorage.getItem('hasAttemptedSeed')) {
          console.warn('Auto-seed sudah dicoba, menghentikan loop.')
          return
        }
        
        setSeeding(true)
        console.log('Database kosong, menjalankan auto-seed...')
        await seedCurriculum()
        
        sessionStorage.setItem('hasAttemptedSeed', 'true')
        setSeeding(false)
        window.location.reload()
      }
    }
    autoSeed()
  }, [loading, levels, seeding])

  if (loading || progressLoading || (levels.length === 0 && seeding)) return (
    <div style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontWeight: 800, color: '#00D166', fontSize: 20 }}>Menyiapkan Kurikulum...</div>
      <div style={{ fontSize: 14, color: '#6b7280' }}>Sedang mengisi 50 materi investasi ke database kamu.</div>
    </div>
  )

  if (fetchError) return (
    <div style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontWeight: 800, color: '#ef4444', fontSize: 20 }}>Gagal Mengambil Data Supabase</div>
      <div style={{ fontSize: 14, color: '#6b7280', maxWidth: 400, textAlign: 'center' }}>
        Pastikan RLS mati. Pesan Error: <br/><strong>{fetchError}</strong>
      </div>
    </div>
  )

  // Flatten all lessons into one list with positions for global path rendering
  const allLessons = levels.flatMap(lvl => lvl.lessons)
  const nodePositions = allLessons.map((_, i) => getNodePos(i))

  return (
    <div style={{ display: 'flex', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ flex: 1, paddingBottom: 100 }}>
        
        {/* Header Banner */}
        <div style={{ background: '#e2e5ea', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden', marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 8, position: 'relative', zIndex: 2 }}>
            InvestaGo Academy
          </h2>
          <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.6, maxWidth: '60%', position: 'relative', zIndex: 2 }}>
            Selesaikan 10 level untuk menjadi investor profesional. Dari dasar keuangan hingga portofolio impian.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, position: 'relative', zIndex: 2 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={16} color="#00D166" />
              <span style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{completedLessons.size} Pelajaran Selesai</span>
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={16} color="#FFC107" fill="#FFC107" />
              <span style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{totalXp.toLocaleString('id-ID')} XP Total</span>
            </div>
          </div>
          <div style={{ position: 'absolute', right: 40, bottom: -10, opacity: 0.2 }}>
             <Zap size={120} color="#1f2937" fill="#1f2937" />
          </div>
        </div>

        {/* Level Sections */}
        {levels.map((lvl, lIdx) => {
          const startIdx = levels.slice(0, lIdx).reduce((acc, l) => acc + l.lessons.length, 0)
          const sectionH = lvl.lessons.length * VERTICAL_GAP
          
          return (
            <div key={lvl.id} style={{ marginBottom: 80 }}>
              {/* Level Title Header */}
              <div style={{ 
                background: lvl.color, padding: '16px 24px', borderRadius: 20, 
                marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16,
                boxShadow: `0 8px 0 ${lvl.shadow_color}`
              }}>
                <span style={{ fontSize: 32 }}>{lvl.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.7)', letterSpacing: '1px' }}>LEVEL {lvl.id}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>{lvl.title}</div>
                </div>
              </div>

              {/* Path & Nodes for this level */}
              <div style={{ position: 'relative', width: CW, height: sectionH, margin: '0 auto' }}>
                <svg width={CW} height={sectionH} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible' }}>
                  {lvl.lessons.map((_, i) => {
                    const currentIdx = startIdx + i
                    const nextIdx = currentIdx + 1
                    if (nextIdx >= allLessons.length) return null
                    
                    // Adjust path coordinates to be local to this section
                    const A = nodePositions[currentIdx]
                    const B = nodePositions[nextIdx]
                    const localA = { ...A, cy: A.cy - (startIdx * VERTICAL_GAP) }
                    const localB = { ...B, cy: B.cy - (startIdx * VERTICAL_GAP) }
                    
                    return <path key={i} d={makePath(localA, localB)} {...DASH} />
                  })}
                </svg>

                {lvl.lessons.map((less, i) => {
                  const currentIdx = startIdx + i
                  const pos = nodePositions[currentIdx]
                  const localY = pos.cy - (startIdx * VERTICAL_GAP)
                  const isDone = completedLessons.has(less.id)
                  
                  // Lesson pertama selalu terbuka. Lesson berikutnya terbuka jika lesson sebelumnya sudah selesai.
                  const prevLesson = allLessons[currentIdx - 1]
                  const isLocked = currentIdx > 0 && !completedLessons.has(prevLesson?.id)
                  
                  return (
                    <div key={less.id} style={{ position: 'absolute', left: pos.cx - pos.r, top: localY - pos.r, width: pos.r * 2, height: pos.r * 2 }}>
                      <div 
                        onClick={() => !isLocked && navigate(`/lesson/${less.id}`)}
                        style={{
                          width: '100%', height: '100%', borderRadius: '50%', 
                          background: isLocked ? '#c8cdd6' : isDone ? '#00a652' : lvl.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: isLocked ? '0 8px 0 #a0a8b5' : isDone ? '0 8px 0 #007a3d' : `0 8px 0 ${lvl.shadow_color}`,
                          cursor: isLocked ? 'default' : 'pointer',
                          transition: 'transform 0.15s',
                          outline: isDone ? '3px solid #00D166' : 'none',
                          outlineOffset: 3
                        }}
                        onMouseEnter={e => !isLocked && (e.currentTarget.style.transform = 'scale(1.08)')}
                        onMouseLeave={e => !isLocked && (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        {isLocked
                          ? <Lock size={24} color="#6b7280" />
                          : isDone
                            ? <CheckCircle size={28} color="white" />
                            : <span style={{fontSize: 24}}>{less.emoji}</span>
                        }
                      </div>
                      
                      {/* Label */}
                      <div style={{ 
                        position: 'absolute', left: '50%', transform: 'translateX(-50%)', 
                        top: '110%', width: 140, textAlign: 'center' 
                      }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: isLocked ? '#9ca3af' : '#111827', lineHeight: 1.2 }}>
                          {less.title}
                        </div>
                        {isDone && (
                          <div style={{ fontSize: 11, color: '#00a652', fontWeight: 700, marginTop: 3 }}>✓ Selesai</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Tombol Manual Seed Jika Data Masih Kosong */}
        {levels.length === 0 && !loading && (
          <div style={{ textAlign: 'center', marginTop: 100 }}>
             <h3 style={{fontSize: 20, color: '#111827', marginBottom: 12}}>Data Kurikulum Kosong</h3>
             <p style={{ color: '#6b7280', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                Jika Anda sudah menonaktifkan RLS, silakan coba isi ulang database dengan mengklik tombol di bawah ini.
             </p>
             <button onClick={async () => {
                setSeeding(true)
                await seedCurriculum()
                setSeeding(false)
                window.location.reload()
             }} disabled={seeding} style={{
                padding: '16px 32px', borderRadius: 16, background: '#7C4DFF', color: 'white',
                fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, margin: '0 auto',
                boxShadow: '0 4px 14px rgba(124, 77, 255, 0.4)'
             }}>
                <Database size={20} />
                {seeding ? 'Mengisi Data...' : 'Coba Isi Ulang Database'}
             </button>
          </div>
        )}

      </div>

      <RightSidebar />
>>>>>>> 4843707375dd08229cb2f42f571706f7d944e0f7
    </div>
  )
}
