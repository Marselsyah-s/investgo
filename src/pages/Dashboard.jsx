import { Star, TrendingUp, Lock, Wallet } from 'lucide-react'
import RightSidebar from '../components/RightSidebar'

// Container & node geometry
const CW = 460        // total container width
const CX = CW / 2    // 230 — horizontal center

const N1 = { cx: CX,       r: 50, top: 0   }   // Candlestick
const N2 = { cx: CX + 140, r: 45, top: 160 }   // Bull & Bear  (shifted right)
const N3 = { cx: CX - 140, r: 45, top: 310 }   // Money Bag    (shifted left)
const N4 = { cx: CX,       r: 45, top: 470 }   // Balance Scale

const PR = 22   // corner radius for SVG path curves
const DASH = { stroke: '#c8cdd6', strokeWidth: 3, strokeDasharray: '8 6', fill: 'none', strokeLinecap: 'round' }

// Build an L-shaped SVG path: leaves bottom of A, arrives top of B
function makePath(A, B) {
  const ax = A.cx, ay = A.top + A.r * 2
  const bx = B.cx, by = B.top
  const midY = ay + (by - ay) / 2
  const goRight = bx > ax
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

const SVG_H = N4.top + N4.r * 2 + 90

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ flex: 1, paddingBottom: 100 }}>

        {/* Header Banner */}
        <div style={{ background: '#e2e5ea', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden', marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 8, position: 'relative', zIndex: 2 }}>
            Pelajaran Saham Hari Ini
          </h2>
          <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.6, maxWidth: '60%', position: 'relative', zIndex: 2 }}>
            Lanjutkan perjalanan Anda untuk menjadi investor handal. Selesaikan unit "Dasar-Dasar Candlestick" untuk bonus XP.
          </p>
          <div style={{ position: 'absolute', right: 40, bottom: -10, opacity: 0.2 }}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <path d="M10 80L40 40L60 60L90 10" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M70 10H90V30" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40 20L45 10L50 20L60 25L50 30L45 40L40 30L30 25L40 20Z" fill="#1f2937"/>
              <path d="M15 40L18 32L26 29L18 26L15 18L12 26L4 29L12 32L15 40Z" fill="#1f2937"/>
            </svg>
          </div>
        </div>

        {/* Nodes Container — fixed size, all children absolutely positioned */}
        <div style={{ position: 'relative', width: CW, height: SVG_H, margin: '0 auto' }}>

          {/* ── SVG dashed connectors ── */}
          <svg
            width={CW} height={SVG_H}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible' }}
          >
            <path d={makePath(N1, N2)} {...DASH} />
            <path d={makePath(N2, N3)} {...DASH} />
            <path d={makePath(N3, N4)} {...DASH} />
          </svg>

          {/* ── Node 1: Candlestick Basic (Active) ── */}
          <div style={{ position: 'absolute', left: N1.cx - N1.r, top: N1.top, width: N1.r * 2, height: N1.r * 2 }}>
            {/* Progress ring */}
            <svg style={{ position: 'absolute', top: -10, left: -10, width: 120, height: 120, pointerEvents: 'none' }} viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e6fff2" strokeWidth="8" />
              <circle cx="60" cy="60" r="54" fill="none" stroke="#00D166" strokeWidth="8" strokeDasharray="339" strokeDashoffset="100" strokeLinecap="round" />
            </svg>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%', background: '#00D166',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 0 #00a652, 0 16px 24px rgba(0,209,102,0.3)',
              cursor: 'pointer', position: 'relative', zIndex: 1
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21V10"/><path d="M15 21v-4"/><path d="M9 3v3"/><path d="M15 3v2"/>
                <path d="M7 6h4v4H7z"/><path d="M13 5h4v4h-4z"/>
              </svg>
            </div>
          </div>
          <div style={{ position: 'absolute', left: N1.cx - 80, top: N1.top + N1.r * 2 + 14, width: 160, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>Candlestick Basic</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 4, justifyContent: 'center' }}>
              <Star size={14} fill="#FFC107" color="#FFC107" />
              <Star size={14} fill="#FFC107" color="#FFC107" />
              <Star size={14} fill="none" color="#c8cdd6" />
            </div>
          </div>

          {/* ── Node 2: Bull & Bear (Mastered) ── */}
          <div style={{ position: 'absolute', left: N2.cx - N2.r, top: N2.top, width: N2.r * 2, height: N2.r * 2 }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%', background: '#7C4DFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 0 #5a2dcc'
            }}>
              <TrendingUp size={32} color="white" strokeWidth={2.5} />
            </div>
          </div>
          <div style={{ position: 'absolute', left: N2.cx - 60, top: N2.top + N2.r * 2 + 14, width: 120, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>Bull &amp; Bear</div>
            <div style={{ marginTop: 4, fontSize: 11, fontWeight: 800, color: '#7C4DFF', letterSpacing: '1px' }}>MASTERED</div>
          </div>

          {/* ── Node 3: Money Bag 101 ── */}
          <div style={{ position: 'absolute', left: N3.cx - N3.r, top: N3.top, width: N3.r * 2, height: N3.r * 2 }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%', background: '#FFC107',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 0 #ff8f00'
            }}>
              <Wallet size={32} color="white" strokeWidth={2.5} />
            </div>
          </div>
          <div style={{ position: 'absolute', left: N3.cx - 60, top: N3.top + N3.r * 2 + 14, width: 120, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>Money Bag 101</div>
            <div style={{ width: 60, height: 6, background: '#e2e5ea', borderRadius: 9999, marginTop: 8, marginLeft: 'auto', marginRight: 'auto' }}>
              <div style={{ width: '40%', height: '100%', background: '#FFC107', borderRadius: 9999 }} />
            </div>
          </div>

          {/* ── Node 4: Balance Scale (Locked) ── */}
          <div style={{ position: 'absolute', left: N4.cx - N4.r, top: N4.top, width: N4.r * 2, height: N4.r * 2 }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%', background: '#c8cdd6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 0 #a0a8b5'
            }}>
              <Lock size={30} color="#6b7280" />
            </div>
          </div>
          <div style={{ position: 'absolute', left: N4.cx - 60, top: N4.top + N4.r * 2 + 14, width: 120, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#6b7280' }}>Balance Scale</div>
            <div style={{ marginTop: 4, fontSize: 11, color: '#a0a8b5' }}>Unlock Level 5</div>
          </div>

        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  )
}
