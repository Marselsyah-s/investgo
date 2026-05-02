import { Map, Gift, Bot, BarChart3, Users, UserCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { icon: <Map size={22} />, label: 'Learning Path', path: '/dashboard' },
    { icon: <Gift size={22} />, label: 'Rewards & XP', path: '/rewards' },
    { icon: <Bot size={22} />, label: 'AI Tutor', path: '/tutor' },
    { icon: <BarChart3 size={22} />, label: 'Simulasi Market', path: '/sandbox' },
    { icon: <Users size={22} />, label: 'Mentorship & Funding', path: '/mentorship' },
    { icon: <UserCircle size={22} />, label: 'Profil Saya', path: '/profile' },
  ]

  return (
    <div style={{
      width: 260,
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: '#F7F9FA',
      borderRight: 'none',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      overflowY: 'auto'
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', padding: '0 12px', marginBottom: 40 }}>
        <h1 style={{ fontWeight: 800, fontSize: 24, color: '#00D166', letterSpacing: '-0.5px' }}>
          InvestGo
        </h1>
      </Link>

      {/* Nav Menu */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.label}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '12px 16px',
                borderRadius: 16,
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#00D166' : '#6b7280',
                background: isActive ? 'white' : 'transparent',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = '#e2e5ea'
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              <div style={{
                color: isActive ? '#00D166' : '#a0a8b5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.icon}
              </div>
              <span style={{ fontSize: 15 }}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Upgrade to Pro Card */}
      <div style={{
        background: 'linear-gradient(135deg, #00D166, #00a652)',
        borderRadius: 16,
        padding: 20,
        color: 'white',
        boxShadow: '0 8px 24px rgba(0,209,102,0.25)',
        marginTop: 20
      }}>
        <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.5px', marginBottom: 8 }}>
          UPGRADE TO PRO
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 16, opacity: 0.9 }}>
          Unlock advanced market analysis tools.
        </div>
        <button style={{
          width: '100%',
          padding: '10px',
          background: 'white',
          color: '#00a652',
          border: 'none',
          borderRadius: 9999,
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer'
        }}>
          Go Premium
        </button>
      </div>
    </div>
  )
}
