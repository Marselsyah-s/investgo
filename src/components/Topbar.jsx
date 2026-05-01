import { useState, useEffect, useRef } from 'react'
import { Bell, Flame, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useUserStats } from '../hooks/useUserStats'

export default function Topbar() {
  const navigate = useNavigate()
  const { coins, hearts, refresh } = useUserStats()
  const [user, setUser] = useState(null)
  const [isRefilling, setIsRefilling] = useState(false)
  const [showNoCoinsModal, setShowNoCoinsModal] = useState(false)

  const handleRefill = async (e) => {
    e.stopPropagation()
    if (coins < 50) {
      setShowNoCoinsModal(true)
      return
    }

    setIsRefilling(true)
    const { data: { session } } = await supabase.auth.getSession()
    
    try {
      const res = await fetch('http://localhost:5000/api/refill-hearts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        // Panggil refresh manual sebagai cadangan jika real-time lambat
        await refresh()
      } else {
        alert(data.error || 'Gagal memulihkan nyawa')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsRefilling(false)
    }
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUser(user)
    })
  }, [])

  const getInitial = () => {
    const name = user?.user_metadata?.display_name || user?.email || '?'
    return name.charAt(0).toUpperCase()
  }

  const [isCoinsHovered, setIsCoinsHovered] = useState(false)
  const [isHeartsHovered, setIsHeartsHovered] = useState(false)



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
      gap: 16,
      position: 'relative' // Base for popover
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
      
      {/* Coins / XP - With Click-to-Persist Popover */}
      <div 
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsCoinsHovered(true)}
        onMouseLeave={() => setIsCoinsHovered(false)}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: isCoinsHovered ? '#f3f4f6' : 'white', 
          padding: '8px 16px', borderRadius: 9999,
          fontWeight: 700, color: isCoinsHovered ? '#00D166' : '#1f2937', 
          fontSize: 15, cursor: 'default',
          boxShadow: isCoinsHovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'all 0.2s',
          border: isCoinsHovered ? '1.5px solid #00D166' : '1.5px solid transparent'
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%', background: '#FFC107',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 12, fontWeight: 900
          }}>C</div>
          {coins.toLocaleString('id-ID')}
        </div>

        {/* Popover */}
        {isCoinsHovered && (
          <div style={{
            position: 'absolute', top: '100%', left: '50%', 
            width: 320, padding: '15px 0 0 0', // Berfungsi sebagai jembatan hover
            zIndex: 1000,
            transform: 'translateX(-50%)',
          }}>
            <div style={{
              background: 'white', borderRadius: 24, padding: 24,
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              border: '2px solid #e2e5ea', 
              animation: 'popIn 0.2s ease-out forwards',
              position: 'relative'
            }}>
              <style>{`
                @keyframes popIn {
                  from { opacity: 0; transform: translateY(10px) scale(0.95); }
                  to { opacity: 1; transform: translateY(0) scale(1); }
                }
              `}</style>
              
              {/* Caret */}
              <div style={{
                position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(45deg)',
                width: 18, height: 18, background: 'white', borderTop: '2px solid #e2e5ea', borderLeft: '2px solid #e2e5ea'
              }} />

            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {/* Treasure Chest Graphic */}
              <div style={{ 
                width: 84, height: 84, background: 'linear-gradient(135deg, #FFC107, #ff9800)', borderRadius: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44,
                boxShadow: '0 8px 16px rgba(255,193,7,0.3)'
              }}>
                💰
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: 18, fontWeight: 800, color: '#111827' }}>Koin InvestaGo</h4>
                <p style={{ margin: '0 0 16px 0', fontSize: 14, color: '#6b7280', fontWeight: 500, lineHeight: 1.4 }}>
                  Kamu punya <strong>{coins.toLocaleString('id-ID')}</strong> koin untuk dibelanjakan.
                </p>
                <button 
                  onClick={() => navigate('/rewards')}
                  style={{
                    color: '#00D166', fontWeight: 800, fontSize: 13, 
                    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                    textTransform: 'uppercase', letterSpacing: '0.8px',
                    display: 'flex', alignItems: 'center', gap: 4
                  }}
                >
                  Ke Toko Hadiah →
                </button>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>

      {/* Hearts Popover */}
      <div 
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsHeartsHovered(true)}
        onMouseLeave={() => setIsHeartsHovered(false)}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: isHeartsHovered ? '#fee2e2' : 'white', 
          padding: '8px 16px', borderRadius: 9999,
          fontWeight: 700, color: '#ef4444', fontSize: 15, cursor: 'default',
          boxShadow: isHeartsHovered ? '0 4px 12px rgba(239,68,68,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'all 0.2s',
          border: isHeartsHovered ? '1.5px solid #ef4444' : '1.5px solid transparent'
        }}>
          <Heart size={18} fill="#ef4444" color="#ef4444" />
          {hearts}
        </div>

        {/* Hearts Popover Content */}
        {isHeartsHovered && (
          <div style={{
            position: 'absolute', top: '100%', right: -20, 
            width: 320, padding: '15px 0 0 0', // Jembatan hover
            zIndex: 1000,
          }}>
            <div style={{
              background: 'white', borderRadius: 24, padding: 24,
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              border: '2px solid #e2e5ea', 
              animation: 'popIn 0.2s ease-out forwards',
              textAlign: 'center',
              position: 'relative'
            }}>
              {/* Caret */}
              <div style={{
                position: 'absolute', top: -10, right: 35, transform: 'rotate(45deg)',
                width: 18, height: 18, background: 'white', borderTop: '2px solid #e2e5ea', borderLeft: '2px solid #e2e5ea'
              }} />

            <h3 style={{ margin: '0 0 16px 0', fontSize: 20, fontWeight: 800, color: '#1f2937' }}>Hati</h3>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <Heart 
                  key={i} 
                  size={32} 
                  fill={i <= hearts ? "#ef4444" : "#e5e7eb"} 
                  color={i <= hearts ? "#ef4444" : "#d1d5db"} 
                  style={{ transition: 'all 0.3s' }}
                />
              ))}
            </div>

            <p style={{ margin: '0 0 4px 0', fontSize: 18, fontWeight: 800, color: '#374151' }}>
              {hearts === 5 ? 'Hatimu masih penuh' : `Kamu punya ${hearts} nyawa`}
            </p>
            <p style={{ margin: '0 0 24px 0', fontSize: 14, color: '#6b7280', fontWeight: 500 }}>
              {hearts === 5 ? 'Ayo terus belajar!' : 'Ingat, jangan sampai kehabisan nyawa!'}
            </p>

            {hearts < 5 ? (
              <button 
                onClick={handleRefill}
                disabled={isRefilling}
                style={{
                  width: '100%', padding: '12px', background: '#ef4444', color: 'white',
                  borderRadius: 16, border: 'none', fontWeight: 800, fontSize: 14,
                  cursor: isRefilling ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 4px 0 #b91c1c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  opacity: isRefilling ? 0.7 : 1
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: '#FFC107',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 10, fontWeight: 900
                }}>C</div>
                {isRefilling ? 'MEMPROSES...' : 'PULIHKAN DENGAN 50'}
              </button>
            ) : (
              <div style={{
                width: '100%', padding: '12px', background: '#f3f4f6', color: '#9ca3af',
                borderRadius: 16, fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px'
              }}>
                Nyawa Terisi Penuh
              </div>
            )}
            </div>
          </div>
        )}
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
      {/* Insufficient Coins Modal */}
      {showNoCoinsModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            background: 'white', width: '90%', maxWidth: 400, borderRadius: 28, padding: 32,
            textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            animation: 'modalSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes modalSlideUp { 
                from { opacity: 0; transform: translateY(20px) scale(0.9); } 
                to { opacity: 1; transform: translateY(0) scale(1); } 
              }
            `}</style>
            
            <div style={{ 
              width: 80, height: 80, background: '#fee2e2', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', background: '#FFC107',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 24, fontWeight: 900, boxShadow: '0 4px 10px rgba(255,193,7,0.4)'
              }}>C</div>
            </div>

            <h3 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 12 }}>Koin Tidak Cukup</h3>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.5, marginBottom: 32 }}>
              Kamu butuh <strong>50 koin</strong> untuk memulihkan nyawa. Ayo kumpulkan koin dengan menyelesaikan kuis!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button 
                onClick={() => {
                  setShowNoCoinsModal(false)
                  navigate('/rewards')
                }}
                style={{
                  width: '100%', padding: '16px', background: '#00D166', color: 'white',
                  borderRadius: 16, border: 'none', fontWeight: 800, fontSize: 16,
                  cursor: 'pointer', boxShadow: '0 4px 0 #00a652', transition: 'all 0.1s'
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'translateY(2px)'}
                onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                CARI KOIN SEKARANG
              </button>
              <button 
                onClick={() => setShowNoCoinsModal(false)}
                style={{
                  width: '100%', padding: '12px', background: 'transparent', color: '#9ca3af',
                  borderRadius: 16, border: 'none', fontWeight: 700, fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                NANTI SAJA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
