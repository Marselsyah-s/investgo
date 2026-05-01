import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp, BookOpen, BarChart2, Trophy, Star,
  ArrowRight, CheckCircle, ChevronLeft, ChevronRight,
  Zap, Shield, Users
} from 'lucide-react'
import Navbar from '../components/Navbar'

/* ── hook sederhana untuk animasi saat scroll ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── data ── */
const features = [
  {
    icon: <BookOpen size={28} />,
    color: '#00D166',
    bg: '#e6fff2',
    title: 'Learning Path Gamified',
    desc: 'Pelajari saham, reksa dana, dan kripto lewat jalur belajar bergaya game. Kumpulkan XP dan naiki level!',
  },
  {
    icon: <BarChart2 size={28} />,
    color: '#7C4DFF',
    bg: '#f0ebff',
    title: 'Virtual Trading Simulator',
    desc: 'Praktik trading tanpa risiko menggunakan uang virtual. Rasakan sensasi pasar nyata dengan aman.',
  },
  {
    icon: <Trophy size={28} />,
    color: '#FFC107',
    bg: '#fffde7',
    title: 'Leaderboard & Tantangan',
    desc: 'Bersaing dengan ribuan investor muda. Selesaikan tantangan mingguan dan raih posisi teratas!',
  },
]

const steps = [
  { num: '01', color: '#00D166', title: 'Daftar Gratis', desc: 'Buat akun dalam 30 detik. Tidak perlu kartu kredit.' },
  { num: '02', color: '#7C4DFF', title: 'Pilih Jalur Belajar', desc: 'Mulai dari dasar atau langsung ke topik favoritmu.' },
  { num: '03', color: '#FFC107', title: 'Praktik & Menangkan', desc: 'Terapkan ilmu di simulator dan bersaing di leaderboard.' },
]

const testimonials = [
  { name: 'Rafi Andika', role: 'Mahasiswa Ekonomi', rating: 5, avatar: 'RA', color: '#00D166', text: 'InvestaGo bikin belajar investasi jadi seru banget! Dalam 2 minggu saya sudah paham cara baca candlestick chart.' },
  { name: 'Siti Nurhaliza', role: 'Fresh Graduate', rating: 5, avatar: 'SN', color: '#7C4DFF', text: 'Fitur virtual trading-nya luar biasa. Saya bisa latihan tanpa takut rugi. Sekarang sudah mulai investasi sungguhan!' },
  { name: 'Budi Santoso', role: 'Karyawan Swasta', rating: 5, avatar: 'BS', color: '#FFC107', text: 'Modulnya rapi dan mudah dipahami. Sistem XP-nya bikin saya semangat terus belajar setiap hari.' },
  { name: 'Dewi Rahayu', role: 'Ibu Rumah Tangga', rating: 5, avatar: 'DR', color: '#00D166', text: 'Awalnya takut investasi, tapi InvestaGo menjelaskan dengan sangat sederhana. Highly recommended!' },
]

const stats = [
  { value: '50K+', label: 'Pengguna Aktif', icon: <Users size={20} />, color: '#00D166' },
  { value: '120+', label: 'Modul Belajar', icon: <BookOpen size={20} />, color: '#7C4DFF' },
  { value: '4.9★', label: 'Rating Pengguna', icon: <Star size={20} />, color: '#FFC107' },
  { value: '100%', label: 'Gratis Selamanya', icon: <Shield size={20} />, color: '#00D166' },
]

/* ── sub-components ── */
function HeroSection() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, background: 'white', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left */}
          <div className="animate-fade-in-up">
            <span className="chip-primary" style={{ marginBottom: 20, display: 'inline-flex' }}>
              <Zap size={14} /> Platform Edukasi Investasi #1
            </span>
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 58px)',
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              marginBottom: 20,
            }}>
              Belajar Investasi<br />
              <span style={{ color: '#00D166' }}>Seru & Aman</span><br />
              Seperti Main Game
            </h1>
            <p style={{ fontSize: 17, color: '#6b7280', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Kuasai saham, reksa dana, dan kripto lewat modul interaktif, virtual trading simulator, dan sistem reward gamified — gratis selamanya.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/register" className="btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
                Mulai Belajar Gratis <ArrowRight size={16} />
              </Link>
              <a href="#how-it-works" className="btn-outlined" style={{ fontSize: 15, padding: '13px 28px' }}>
                Lihat Cara Kerja
              </a>
            </div>
            {/* Trust badges */}
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {['Tidak perlu pengalaman', 'Uang virtual aman', 'Update rutin'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4b5563', fontWeight: 500 }}>
                  <CheckCircle size={15} color="#00D166" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — ilustrasi */}
          <div className="animate-fade-in-up delay-200" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <HeroIllustration />
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){section > div > div{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

function HeroIllustration() {
  return (
    <div style={{ position: 'relative', width: 380, height: 380 }}>
      {/* Main card */}
      <div className="animate-float" style={{
        position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)',
        width: 280, background: 'white', borderRadius: 20,
        boxShadow: '0 12px 48px rgba(0,0,0,0.12)', padding: 20,
        border: '1px solid #e2e5ea',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#e6fff2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={18} color="#00D166" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>Candlestick Basic</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Level 1 • 5 menit</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ background: '#F0F2F5', borderRadius: 9999, height: 8, marginBottom: 12 }}>
          <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg,#00D166,#00a652)', borderRadius: 9999 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280' }}>
          <span>Progres: 65%</span>
          <span>+40 XP</span>
        </div>
      </div>

      {/* XP Badge */}
      <div style={{
        position: 'absolute', bottom: 60, left: 10,
        background: '#7C4DFF', borderRadius: 14, padding: '10px 16px',
        color: 'white', fontWeight: 700, fontSize: 13,
        boxShadow: '0 6px 20px rgba(124,77,255,0.35)',
      }}>
        🏆 +150 XP hari ini
      </div>

      {/* Streak badge */}
      <div style={{
        position: 'absolute', bottom: 60, right: 10,
        background: '#FFC107', borderRadius: 14, padding: '10px 16px',
        color: '#1f2937', fontWeight: 700, fontSize: 13,
        boxShadow: '0 6px 20px rgba(255,193,7,0.35)',
      }}>
        🔥 7 hari streak
      </div>

      {/* BG circle decorations */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, borderRadius: '50%', background: '#e6fff2', zIndex: -1 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 70, height: 70, borderRadius: '50%', background: '#f0ebff', zIndex: -1 }} />
    </div>
  )
}

function StatsBar() {
  const [ref, visible] = useInView()
  return (
    <section ref={ref} style={{ background: '#F0F2F5', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {stats.map((s, i) => (
            <div key={s.label}
              className={visible ? 'animate-fade-in-up' : ''}
              style={{
                animationDelay: `${i * 0.1}s`, opacity: visible ? 1 : 0,
                background: 'white', borderRadius: 16, padding: '20px 24px',
                display: 'flex', alignItems: 'center', gap: 16,
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#111827', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){section > div > div{grid-template-columns:1fr 1fr !important;}}`}</style>
    </section>
  )
}

function FeaturesSection() {
  const [ref, visible] = useInView()
  return (
    <section id="features" ref={ref} style={{ background: 'white', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip-neutral" style={{ marginBottom: 16, display: 'inline-flex' }}>✨ Fitur Unggulan</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#111827', letterSpacing: '-1px', marginBottom: 14 }}>
            Semua yang Kamu Butuhkan<br />untuk Jadi Investor Cerdas
          </h2>
          <p style={{ color: '#6b7280', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Dari teori hingga praktik, InvestaGo menyediakan ekosistem belajar investasi paling lengkap.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {features.map((f, i) => (
            <div key={f.title}
              className={`card ${visible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${i * 0.15}s`, opacity: visible ? 1 : 0 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, marginBottom: 20 }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, color: f.color, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                Pelajari lebih lanjut <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){section > div > div:last-child{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

function HowItWorksSection() {
  const [ref, visible] = useInView()
  return (
    <section id="how-it-works" ref={ref} style={{ background: '#F0F2F5', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip-neutral" style={{ marginBottom: 16, display: 'inline-flex' }}>🚀 Cara Kerja</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#111827', letterSpacing: '-1px' }}>
            Mulai dalam 3 Langkah Mudah
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {steps.map((s, i) => (
            <div key={s.num}
              className={`card ${visible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${i * 0.15}s`, opacity: visible ? 1 : 0, textAlign: 'center', padding: 36 }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 16, opacity: 0.15, letterSpacing: '-2px' }}>
                {s.num}
              </div>
              <div style={{ width: 56, height: 56, borderRadius: 9999, background: s.color, margin: '-52px auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 20, boxShadow: `0 6px 20px ${s.color}44` }}>
                {i + 1}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){section > div > div:last-child{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

function TestimonialsSection() {
  const [ref, visible] = useInView()
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(i => (i + 1) % testimonials.length)
  const visible2 = [idx, (idx + 1) % testimonials.length, (idx + 2) % testimonials.length]

  return (
    <section id="testimonials" ref={ref} style={{ background: 'white', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="chip-neutral" style={{ marginBottom: 16, display: 'inline-flex' }}>💬 Testimoni</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#111827', letterSpacing: '-1px' }}>
            Dipercaya Ribuan Investor Muda
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {visible2.map((ti, i) => {
            const t = testimonials[ti]
            return (
              <div key={ti} className="card" style={{ padding: 28, opacity: visible ? 1 : 0, animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={15} fill="#FFC107" color="#FFC107" />)}
                </div>
                <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 9999, background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
          <button onClick={prev} style={{ width: 40, height: 40, borderRadius: 9999, border: '1.5px solid #c8cdd6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            <ChevronLeft size={18} />
          </button>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: 8, height: 8, borderRadius: 9999, background: i === idx ? '#00D166' : '#c8cdd6', border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }} />
          ))}
          <button onClick={next} style={{ width: 40, height: 40, borderRadius: 9999, border: '1.5px solid #c8cdd6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <style>{`@media(max-width:768px){section > div > div:first-of-type{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

function CTASection() {
  const [ref, visible] = useInView()
  return (
    <section ref={ref} style={{ background: '#F0F2F5', padding: '80px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div
          className={visible ? 'animate-fade-in-up' : ''}
          style={{
            background: 'white', borderRadius: 28,
            padding: 'clamp(40px,6vw,64px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
            border: '1px solid #e2e5ea',
          }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: '#111827', letterSpacing: '-1px', marginBottom: 14 }}>
            Siap Jadi Investor Cerdas?
          </h2>
          <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Bergabung dengan 50.000+ pelajar yang sudah menguasai dunia investasi bersama InvestaGo. Gratis selamanya!
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
              Daftar Sekarang — Gratis! <ArrowRight size={16} />
            </Link>
          </div>
          <p style={{ fontSize: 13, color: '#a0a8b5', marginTop: 16 }}>Tidak perlu kartu kredit • Bisa mulai dalam 30 detik</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#111827', color: '#9ca3af', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#00D166', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={18} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>Investa<span style={{ color: '#00D166' }}>Go</span></span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Platform edukasi investasi #1 di Indonesia. Belajar saham, reksa dana, dan kripto dengan cara yang seru.</p>
          </div>
          {[
            { title: 'Produk', links: ['Learning Path', 'Virtual Trading', 'Leaderboard', 'Kalkulator'] },
            { title: 'Perusahaan', links: ['Tentang Kami', 'Blog', 'Karir', 'Press'] },
            { title: 'Bantuan', links: ['FAQ', 'Kontak', 'Syarat & Ketentuan', 'Privasi'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, color: 'white', fontSize: 14, marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: 'block', fontSize: 14, color: '#6b7280', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#00D166'}
                  onMouseLeave={e => e.target.style.color = '#6b7280'}>
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #374151', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13 }}>© 2025 InvestaGo. All rights reserved.</span>
          <span style={{ fontSize: 13 }}>Made with ❤️ in Indonesia</span>
        </div>
      </div>
      <style>{`@media(max-width:768px){footer > div > div:first-child{grid-template-columns:1fr !important;}}`}</style>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
