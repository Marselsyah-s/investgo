import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        setSuccessMsg('Pendaftaran berhasil! Silakan periksa kotak masuk email Anda untuk melakukan konfirmasi.')
        // Jika Anda mematikan "Confirm Email" di Supabase, user otomatis login.
        // navigate('/dashboard')
      }
    } catch (error) {
      setErrorMsg(error.message || 'Gagal mendaftar. Pastikan email belum terdaftar dan password minimal 6 karakter.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#F0F2F5' }}>
      {/* Left Side - Branding */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #00D166, #00a652)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 60,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -50, width: 400, height: 400, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={28} color="#00D166" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 32, color: 'white', letterSpacing: '-1px' }}>
              InvestaGo
            </span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
            Mulai Perjalanan Investasi Anda
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, lineHeight: 1.6 }}>
            Buat akun sekarang dan mulai belajar materi finansial gratis yang dirancang untuk pemula hingga mahir!
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        padding: 40
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111827', marginBottom: 8 }}>Buat Akun Baru</h2>
            <p style={{ color: '#6b7280' }}>Daftarkan email Anda untuk mulai belajar</p>
          </div>

          {errorMsg && (
            <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '12px 16px', borderRadius: 12, marginBottom: 24, fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <span style={{ lineHeight: 1.5 }}>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div style={{ background: '#f0fdf4', border: '1px solid #4ade80', color: '#166534', padding: '12px 16px', borderRadius: 12, marginBottom: 24, fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
              <span style={{ lineHeight: 1.5 }}>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                Email
              </label>
              <input 
                type="email" 
                placeholder="nama@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 12,
                  border: '1.5px solid #e2e5ea', background: '#F0F2F5',
                  fontSize: 15, color: '#1f2937', outline: 'none',
                  transition: 'all 0.2s', fontFamily: 'inherit'
                }}
                onFocus={e => { e.target.style.borderColor = '#00D166'; e.target.style.background = 'white' }}
                onBlur={e => { e.target.style.borderColor = '#e2e5ea'; e.target.style.background = '#F0F2F5' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                Password (Min. 6 Karakter)
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 12,
                  border: '1.5px solid #e2e5ea', background: '#F0F2F5',
                  fontSize: 15, color: '#1f2937', outline: 'none',
                  transition: 'all 0.2s', fontFamily: 'inherit'
                }}
                onFocus={e => { e.target.style.borderColor = '#00D166'; e.target.style.background = 'white' }}
                onBlur={e => { e.target.style.borderColor = '#e2e5ea'; e.target.style.background = '#F0F2F5' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: 16, marginTop: 8 }}
            >
              {loading ? 'Memproses...' : (
                <>Daftar Sekarang <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
            Sudah punya akun?{' '}
            <Link to="/login" style={{ color: '#00D166', fontWeight: 700, textDecoration: 'none' }}>
              Masuk di sini
            </Link>
          </div>
          
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link to="/" style={{ color: '#a0a8b5', fontSize: 14, textDecoration: 'none' }}>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile styling override */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="flex: 1"] {
            flex: none;
            width: 100%;
          }
          div[style*="minHeight: '100vh'"] {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
