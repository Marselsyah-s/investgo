import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, TrendingUp } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Fitur', href: '#features' },
    { label: 'Cara Kerja', href: '#how-it-works' },
    { label: 'Testimoni', href: '#testimonials' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e5ea' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38,
            borderRadius: 12,
            background: '#00D166',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,209,102,0.35)',
          }}>
            <TrendingUp size={20} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#1f2937', letterSpacing: '-0.5px' }}>
            Invest<span style={{ color: '#00D166' }}>Go</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                padding: '8px 16px',
                borderRadius: 9999,
                color: '#4b5563',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.target.style.background = '#F0F2F5'
                e.target.style.color = '#1f2937'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#4b5563'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="desktop-nav">
          <a href="/login" className="btn-outlined" style={{ padding: '9px 20px', fontSize: 14 }}>
            Masuk
          </a>
          <a href="/register" className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
            Mulai Gratis
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#1f2937',
          }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div style={{
          background: 'white',
          padding: '16px 24px 24px',
          borderTop: '1px solid #e2e5ea',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: 12,
                color: '#374151',
                fontWeight: 600,
                fontSize: 15,
                textDecoration: 'none',
                background: '#F0F2F5',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <a href="/login" className="btn-outlined" style={{ flex: 1, justifyContent: 'center' }}>Masuk</a>
            <a href="/register" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Mulai Gratis</a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
