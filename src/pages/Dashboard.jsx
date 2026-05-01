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
          <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.6, maxWidth: '60%', position: 'relative', zIndex: 2 }}>
            Lanjutkan perjalanan Anda untuk menjadi investor handal. Selesaikan unit "Dasar-Dasar Candlestick" untuk bonus XP.
          </p>
          
          {/* Decorative Stars/Chart in background */}
          <div style={{ position: 'absolute', right: 40, bottom: -10, opacity: 0.2 }}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 80L40 40L60 60L90 10" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M70 10H90V30" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40 20L45 10L50 20L60 25L50 30L45 40L40 30L30 25L40 20Z" fill="#1f2937"/>
              <path d="M15 40L18 32L26 29L18 26L15 18L12 26L4 29L12 32L15 40Z" fill="#1f2937"/>
            </svg>
          </div>
        </div>

        {/* Nodes / Path Container */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>
          
          {/* Node 1: Candlestick Basic (Active) */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Dashed line down right */}
            <div style={{ position: 'absolute', top: 50, left: '50%', width: 160, height: 120, borderLeft: '3px dashed #c8cdd6', borderBottom: '3px dashed #c8cdd6', borderBottomLeftRadius: 16, zIndex: 0 }} />
            <div style={{ position: 'absolute', top: 170, left: '50%', marginLeft: 160, width: 3, height: 40, borderLeft: '3px dashed #c8cdd6', zIndex: 0 }} />
            
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
            <div style={{ position: 'absolute', top: 45, right: '50%', width: 320, height: 120, borderRight: '3px dashed #c8cdd6', borderBottom: '3px dashed #c8cdd6', borderBottomRightRadius: 16, zIndex: 0 }} />
            <div style={{ position: 'absolute', top: 165, right: '50%', marginRight: 320, width: 3, height: 40, borderRight: '3px dashed #c8cdd6', zIndex: 0 }} />
            
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
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -160 }}>
            {/* Dashed line down right */}
            <div style={{ position: 'absolute', top: 45, left: '50%', width: 160, height: 120, borderLeft: '3px dashed #c8cdd6', borderBottom: '3px dashed #c8cdd6', borderBottomLeftRadius: 16, zIndex: 0 }} />
            <div style={{ position: 'absolute', top: 165, left: '50%', marginLeft: 160, width: 3, height: 60, borderLeft: '3px dashed #c8cdd6', zIndex: 0 }} />
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
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
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
      
    </div>
  )
}
