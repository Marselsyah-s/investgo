import { Bell, Flame, Heart, Coins } from 'lucide-react'

export default function Topbar() {
  return (
    <div style={{
      height: 70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 32px',
      gap: 16
    }}>
      {/* Flame / Streak */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'white', padding: '8px 16px', borderRadius: 9999,
        fontWeight: 700, color: '#1f2937', fontSize: 15,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <Flame size={18} fill="#ff8f00" color="#ff8f00" />
        12
      </div>

      {/* Coins / XP */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'white', padding: '8px 16px', borderRadius: 9999,
        fontWeight: 700, color: '#1f2937', fontSize: 15,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%', background: '#FFC107',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 900
        }}>S</div>
        2,450
      </div>

      {/* Hearts */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'white', padding: '8px 16px', borderRadius: 9999,
        fontWeight: 700, color: '#1f2937', fontSize: 15,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <Heart size={18} fill="#ef4444" color="#ef4444" />
        3
      </div>

      {/* Notification */}
      <button style={{
        width: 40, height: 40, borderRadius: '50%', background: 'transparent',
        border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#6b7280'
      }}>
        <Bell size={20} />
      </button>

      {/* User Avatar */}
      <button style={{
        width: 40, height: 40, borderRadius: '50%', background: '#1f2937',
        border: '2px solid #00D166', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0, overflow: 'hidden'
      }}>
        <img src="https://ui-avatars.com/api/?name=Anda&background=1f2937&color=fff" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
    </div>
  )
}
