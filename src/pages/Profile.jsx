import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  User, Mail, Calendar, Shield, LogOut,
  Edit3, Camera, CheckCircle, AlertCircle,
  Award, BookOpen, TrendingUp, Star
} from 'lucide-react'
import { useProgress } from '../hooks/useProgress'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { totalXp, completedLessons, loading: progressLoading } = useProgress()
  const [claimedQuestsCount, setClaimedQuestsCount] = useState(0)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }
      setUser(user)
      setDisplayName(user.user_metadata?.display_name || user.user_metadata?.full_name || '')
      
      // Fetch claimed quests for achievements count
      const { data: statsData } = await supabase
        .from('user_stats')
        .select('claimed_quests')
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (statsData?.claimed_quests) {
        setClaimedQuestsCount(statsData.claimed_quests.length)
      }

      setLoading(false)
    }
    getUser()
  }, [navigate])

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMsg('')
    setErrorMsg('')
    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName }
      })
      if (error) throw error
      setUser(prev => ({
        ...prev,
        user_metadata: { ...prev.user_metadata, display_name: displayName }
      }))
      setSuccessMsg('Profil berhasil diperbarui!')
      setEditMode(false)
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrorMsg(err.message || 'Gagal menyimpan perubahan.')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('hasTakenQuiz')
    navigate('/login')
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  const getInitial = () => {
    const name = user?.user_metadata?.display_name || user?.email || '?'
    return name.charAt(0).toUpperCase()
  }

  const getEmailProvider = (email) => {
    if (!email) return ''
    const domain = email.split('@')[1]
    if (domain?.includes('gmail')) return 'Google Mail'
    if (domain?.includes('yahoo')) return 'Yahoo Mail'
    if (domain?.includes('outlook') || domain?.includes('hotmail')) return 'Outlook'
    return domain
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, border: '4px solid #e2e5ea',
            borderTopColor: '#00D166', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
          }} />
          <p style={{ color: '#6b7280', fontWeight: 500 }}>Memuat profil...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  const stats = [
    { icon: <BookOpen size={20} />, label: 'Pelajaran Selesai', value: completedLessons.size, color: '#3b82f6' },
    { icon: <Star size={20} />, label: 'Total XP', value: totalXp.toLocaleString('id-ID'), color: '#f59e0b' },
    { icon: <TrendingUp size={20} />, label: 'Streak Harian', value: '7 hari', color: '#10b981' },
    { icon: <Award size={20} />, label: 'Pencapaian', value: claimedQuestsCount, color: '#8b5cf6' },
  ]

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', paddingTop: 32 }}>
      {/* Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #00D166, #00a652)',
        borderRadius: 24,
        padding: '40px 40px 80px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 0
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -30, width: 250, height: 250, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600, letterSpacing: '0.5px', marginBottom: 4 }}>
              PROFIL SAYA
            </p>
            <h1 style={{ color: 'white', fontSize: 28, fontWeight: 800, margin: 0 }}>
              {user?.user_metadata?.display_name || 'Pengguna InvestaGo'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 6 }}>
              Bergabung sejak {formatDate(user?.created_at)}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
              color: 'white', padding: '10px 18px', borderRadius: 12,
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
              backdropFilter: 'blur(10px)', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </div>

      {/* Avatar overlapping card */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 40, marginTop: -44, marginBottom: 0, position: 'relative', zIndex: 2 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: '#1f2937', border: '4px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 800, color: '#00D166',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}>
            {getInitial()}
          </div>
          <div style={{
            position: 'absolute', bottom: 4, right: 4,
            width: 24, height: 24, borderRadius: '50%',
            background: '#00D166', border: '2px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Camera size={12} color="white" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        padding: '24px 0 0', marginBottom: 24
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: 16, padding: '20px 16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center'
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `${stat.color}18`, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: stat.color, margin: '0 auto 10px'
            }}>
              {stat.icon}
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Info & Edit Card */}
      <div style={{
        background: 'white', borderRadius: 20,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden'
      }}>
        {/* Card Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 28px', borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={20} color="#00D166" />
            <span style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>
              Informasi Akun
            </span>
          </div>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                color: '#00a652', padding: '8px 16px', borderRadius: 10,
                fontWeight: 600, fontSize: 13, cursor: 'pointer'
              }}
            >
              <Edit3 size={14} />
              Edit Profil
            </button>
          )}
        </div>

        {/* Alert Messages */}
        {successMsg && (
          <div style={{
            margin: '16px 28px 0', padding: '12px 16px', borderRadius: 12,
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            color: '#15803d', fontSize: 14, display: 'flex', alignItems: 'center', gap: 10
          }}>
            <CheckCircle size={18} />
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div style={{
            margin: '16px 28px 0', padding: '12px 16px', borderRadius: 12,
            background: '#fef2f2', border: '1px solid #f87171',
            color: '#b91c1c', fontSize: 14, display: 'flex', alignItems: 'center', gap: 10
          }}>
            <AlertCircle size={18} />
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <div style={{ padding: '24px 28px' }}>
          {editMode ? (
            <form onSubmit={handleSaveProfile}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                  Nama Tampilan
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: 12,
                    border: '1.5px solid #00D166', background: 'white',
                    fontSize: 15, color: '#111827', outline: 'none', fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Email (read-only) */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                  Email (tidak dapat diubah)
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: 12,
                    border: '1.5px solid #e2e5ea', background: '#F7F9FA',
                    fontSize: 15, color: '#6b7280', outline: 'none', fontFamily: 'inherit',
                    boxSizing: 'border-box', cursor: 'not-allowed'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    flex: 1, padding: '12px', borderRadius: 12,
                    background: 'linear-gradient(135deg, #00D166, #00a652)',
                    color: 'white', border: 'none', fontWeight: 700,
                    fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1
                  }}
                >
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false)
                    setErrorMsg('')
                    setDisplayName(user?.user_metadata?.display_name || '')
                  }}
                  style={{
                    padding: '12px 24px', borderRadius: 12,
                    background: 'white', border: '1.5px solid #e2e5ea',
                    color: '#6b7280', fontWeight: 600, fontSize: 15, cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Info rows */}
              {[
                {
                  icon: <User size={18} />, label: 'Nama Tampilan',
                  value: user?.user_metadata?.display_name || '(Belum diatur)',
                  color: '#3b82f6'
                },
                {
                  icon: <Mail size={18} />, label: 'Alamat Email',
                  value: user?.email,
                  color: '#00D166',
                  sub: getEmailProvider(user?.email)
                },
                {
                  icon: <Calendar size={18} />, label: 'Tanggal Bergabung',
                  value: formatDate(user?.created_at),
                  color: '#f59e0b'
                },
                {
                  icon: <Shield size={18} />, label: 'Status Akun',
                  value: user?.email_confirmed_at ? 'Terverifikasi ✓' : 'Belum Diverifikasi',
                  color: user?.email_confirmed_at ? '#10b981' : '#ef4444'
                },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px', borderRadius: 14,
                  background: '#F7F9FA', border: '1px solid #f0f0f0'
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${item.color}15`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: item.color,
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>
                      {item.value}
                    </div>
                    {item.sub && (
                      <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                        via {item.sub}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{
        background: 'white', borderRadius: 20, marginTop: 20, overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #fee2e2'
      }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid #fee2e2' }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#dc2626' }}>Sesi Aktif</span>
        </div>
        <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontWeight: 600, color: '#374151', marginBottom: 4 }}>Keluar dari akun</p>
            <p style={{ fontSize: 13, color: '#6b7280' }}>Anda akan diarahkan kembali ke halaman login.</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#fef2f2', border: '1px solid #f87171',
              color: '#dc2626', padding: '10px 20px', borderRadius: 12,
              fontWeight: 700, fontSize: 14, cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </div>

      <div style={{ height: 40 }} />
    </div>
  )
}
