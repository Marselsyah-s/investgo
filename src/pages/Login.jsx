import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, AlertCircle, TrendingUp } from 'lucide-react'
import { supabase } from '../lib/supabase'
import dragonHero from '../assets/dragon_hero.png'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (data.user) navigate('/dashboard')
    } catch (error) {
      setErrorMsg(error.message || 'Gagal masuk. Periksa kembali email dan password Anda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e8eaed',
      padding: '20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        .auth-card { display: flex; width: 100%; max-width: 860px; border-radius: 28px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.18); }
        .auth-input { width: 100%; padding: 13px 14px 13px 42px; border-radius: 10px; border: 1.5px solid #e2e5ea; background: #f7f8fa; font-size: 14px; color: #1f2937; outline: none; transition: all 0.2s; font-family: inherit; box-sizing: border-box; }
        .auth-input:focus { border-color: #00D166; background: white; }
        .auth-btn { width: 100%; padding: 15px; border-radius: 12px; border: none; background: #00D166; color: white; font-weight: 800; font-size: 16px; cursor: pointer; transition: all 0.2s; font-family: inherit; letter-spacing: 0.2px; }
        .auth-btn:hover { background: #00b856; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,209,102,0.35); }
        .auth-btn:disabled { background: #a0a8b5; cursor: not-allowed; transform: none; box-shadow: none; }
        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); pointer-events: none; }
        @media (max-width: 640px) {
          .auth-card { flex-direction: column; border-radius: 20px; }
          .auth-left { display: none !important; }
        }
      `}</style>

      <div className="auth-card">

        {/* ── LEFT PANEL ──────────────────────────────────── */}
        <div className="auth-left" style={{
          width: '42%',
          background: 'linear-gradient(160deg, #00D166 0%, #00a050 60%, #007a3d 100%)',
          display: 'flex',
          flexDirection: 'column',
          padding: '36px 30px 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Bubble deco */}
          <div style={{ position: 'absolute', top: 24, right: 24, width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ position: 'absolute', top: 80, right: 12, width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <TrendingUp size={18} color="white" strokeWidth={2.5} />
            <span style={{ fontWeight: 700, fontSize: 15, color: 'white' }}>InvestaGo</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1.25 }}>
              cacing, cacing,
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#FFD600', lineHeight: 1.25 }}>
              naga, naga
            </div>
          </div>

          {/* Subtitle */}
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: 24, maxWidth: 220 }}>
            Transform your financial journey from small beginnings to legendary success in a playground of learning.
          </p>

          {/* Dragon Image — centered */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0 24px' }}>
            <img
              src={dragonHero}
              alt="Dragon and worm illustration"
              style={{ width: '90%', borderRadius: 16, objectFit: 'cover', display: 'block', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
            />
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────────── */}
        <div style={{
          flex: 1,
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 44px'
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', margin: '0 0 6px' }}>
            Selamat Datang, Investor!
          </h2>
          <p style={{ fontSize: 13.5, color: '#6b7280', margin: '0 0 32px', lineHeight: 1.55 }}>
            Mulai perjalananmu dari cacing hingga menjadi naga.
          </p>

          {errorMsg && (
            <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '10px 14px', borderRadius: 10, marginBottom: 20, fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Email
              </label>
              <div className="input-wrap">
                <Mail size={15} color="#9ca3af" className="input-icon" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Password
                </label>
                <a href="#" style={{ fontSize: 12, color: '#00D166', fontWeight: 600, textDecoration: 'none' }}>
                  Lupa password?
                </a>
              </div>
              <div className="input-wrap">
                <Lock size={15} color="#9ca3af" className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="auth-btn" style={{ marginTop: 6 }}>
              {loading ? 'Memproses...' : 'Masuk Sekarang'}
            </button>
          </form>

          <p style={{ marginTop: 24, textAlign: 'center', fontSize: 13.5, color: '#6b7280' }}>
            Belum punya akun?{' '}
            <Link to="/register" style={{ color: '#00D166', fontWeight: 700, textDecoration: 'none' }}>
              Daftar di sini.
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
