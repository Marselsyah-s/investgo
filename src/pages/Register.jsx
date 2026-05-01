import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react'
import { supabase } from '../lib/supabase'
import dragonHero from '../assets/dragon_hero.png'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    if (password !== confirmPassword) {
      setErrorMsg('Password dan Konfirmasi Password tidak sama.')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      })

      if (error) throw error

      if (data.user) {
        setSuccessMsg('Pendaftaran berhasil! Mengalihkan ke halaman login...')
        setTimeout(() => navigate('/login'), 2000)
      }
    } catch (error) {
      setErrorMsg(error.message || 'Gagal mendaftar. Pastikan email belum terdaftar dan password minimal 6 karakter.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

        .reg-page {
          position: fixed;
          inset: 0;
          display: flex;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          overflow: hidden;
        }

        /* ── Left Panel ─── */
        .reg-left {
          flex: 0 0 45%;
          height: 100%;
          background: linear-gradient(160deg, #00D166 0%, #00a050 60%, #007a3d 100%);
          display: flex;
          flex-direction: column;
          padding: 36px 30px 0;
          position: relative;
          overflow: hidden;
        }

        /* ── Right Panel ─── */
        .reg-right {
          flex: 1;
          height: 100%;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 44px;
          overflow-y: auto;
        }

        /* ── Form elements ─── */
        .reg-input {
          width: 100%; padding: 13px 14px 13px 42px; border-radius: 10px;
          border: 1.5px solid #e2e5ea; background: #f7f8fa;
          font-size: 14px; color: #1f2937; outline: none;
          transition: all 0.2s; font-family: inherit; box-sizing: border-box;
        }
        .reg-input:focus { border-color: #00D166; background: white; }

        .reg-btn {
          width: 100%; padding: 15px; border-radius: 12px; border: none;
          background: #00D166; color: white; font-weight: 800; font-size: 16px;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .reg-btn:hover { background: #00b856; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,209,102,0.35); }
        .reg-btn:disabled { background: #a0a8b5; cursor: not-allowed; transform: none; box-shadow: none; }

        .reg-icon-wrap { position: relative; }
        .reg-icon-wrap svg:first-child { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); pointer-events: none; }

        /* ── Dragon image ─── */
        .reg-dragon-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 16px 0 24px; min-height: 0; }
        .reg-dragon-img { width: 90%; max-height: 100%; border-radius: 16px; object-fit: cover; display: block; box-shadow: 0 8px 32px rgba(0,0,0,0.25); }

        /* ── Mobile Banner ─── */
        .reg-mobile-banner { display: none; }

        /* ─── TABLET (≤ 900px) ─── */
        @media (max-width: 900px) {
          .reg-left { flex: 0 0 40%; padding: 28px 24px 0; }
          .reg-left .reg-heading { font-size: 22px !important; }
          .reg-right { padding: 32px 24px; }
        }

        /* ─── MOBILE (≤ 640px) ─── */
        @media (max-width: 640px) {
          .reg-page { position: fixed; inset: 0; flex-direction: column; overflow-y: auto; overflow-x: hidden; }
          .reg-left { display: none; }
          .reg-mobile-banner {
            display: flex;
            align-items: center;
            gap: 16px;
            background: linear-gradient(135deg, #00D166, #007a3d);
            padding: 24px 20px;
            flex-shrink: 0;
          }
          .reg-mobile-banner img {
            width: 72px; height: 72px; border-radius: 14px; object-fit: cover;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          }
          .reg-right { height: auto; flex: 1; padding: 28px 20px; overflow-y: visible; }
        }
      `}</style>

      <div className="reg-page">

        {/* ── Mobile Top Banner (visible only on mobile) ── */}
        <div className="reg-mobile-banner">
          <img src={dragonHero} alt="InvestaGo Dragon" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <TrendingUp size={14} color="white" strokeWidth={2.5} />
              <span style={{ fontWeight: 700, fontSize: 13, color: 'white' }}>InvestaGo</span>
            </div>
            <div style={{ fontWeight: 900, fontSize: 16, color: 'white', lineHeight: 1.3 }}>
              mulai sekarang, <span style={{ color: '#FFD600' }}>jadi naga!</span>
            </div>
          </div>
        </div>

        {/* ── LEFT PANEL (hidden on mobile) ── */}
        <div className="reg-left">
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
            <div className="reg-heading" style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1.25 }}>
              mulai sekarang,
            </div>
            <div className="reg-heading" style={{ fontSize: 26, fontWeight: 900, color: '#FFD600', lineHeight: 1.25 }}>
              jadi naga!
            </div>
          </div>

          {/* Subtitle */}
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: 24, maxWidth: 220 }}>
            Daftarkan dirimu dan mulailah perjalanan luar biasa dari cacing kecil menjadi naga investasi.
          </p>

          {/* Dragon Image */}
          <div className="reg-dragon-wrap">
            <img src={dragonHero} alt="Dragon and worm illustration" className="reg-dragon-img" />
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="reg-right">
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111827', margin: '0 0 6px' }}>
            Buat Akun Baru!
          </h2>
          <p style={{ fontSize: 13.5, color: '#6b7280', margin: '0 0 28px', lineHeight: 1.55 }}>
            Bergabung dan jadilah investor masa depan.
          </p>

          {errorMsg && (
            <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '10px 14px', borderRadius: 10, marginBottom: 16, fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div style={{ background: '#f0fdf4', border: '1px solid #4ade80', color: '#166534', padding: '10px 14px', borderRadius: 10, marginBottom: 16, fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {/* Nama */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Nama Lengkap
              </label>
              <div className="reg-icon-wrap">
                <User size={15} color="#9ca3af" />
                <input type="text" placeholder="Nama kamu" value={name}
                  onChange={e => setName(e.target.value)} className="reg-input" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Email
              </label>
              <div className="reg-icon-wrap">
                <Mail size={15} color="#9ca3af" />
                <input type="email" placeholder="nama@email.com" required value={email}
                  onChange={e => setEmail(e.target.value)} className="reg-input" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Password
              </label>
              <div className="reg-icon-wrap">
                <Lock size={15} color="#9ca3af" />
                <input type="password" placeholder="••••••••" required minLength={6} value={password}
                  onChange={e => setPassword(e.target.value)} className="reg-input" />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Konfirmasi Password
              </label>
              <div className="reg-icon-wrap">
                <Lock size={15} color="#9ca3af" />
                <input type="password" placeholder="••••••••" required minLength={6} value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)} className="reg-input" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="reg-btn" style={{ marginTop: 6 }}>
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p style={{ marginTop: 20, textAlign: 'center', fontSize: 13.5, color: '#6b7280' }}>
            Sudah punya akun?{' '}
            <Link to="/login" style={{ color: '#00D166', fontWeight: 700, textDecoration: 'none' }}>
              Masuk di sini.
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
