import { useState, useEffect } from 'react'
import { Bell, Flame, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Topbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const getInitial = () => {
    const name = user?.user_metadata?.display_name || user?.email || '?'
    return name.charAt(0).toUpperCase()
  }

  const getDisplayName = () => {
    return user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Pengguna'
  }

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
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 12, fontWeight: 900
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

      {/* User Avatar — klik ke halaman profil */}
      <button
        onClick={() => navigate('/profile')}
        title={`Lihat profil: ${getDisplayName()}`}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'white', border: '1.5px solid #e2e5ea',
          borderRadius: 9999, padding: '6px 14px 6px 6px',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#00D166'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,209,102,0.2)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e5ea'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #00D166, #00a652)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: 14, flexShrink: 0
        }}>
          {getInitial()}
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#374151', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {getDisplayName()}
        </span>
      </button>
    </div>
  )
}
