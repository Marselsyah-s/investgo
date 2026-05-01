import React, { useState } from 'react'
import { Trophy, Star, Target, Zap, Shield, Crown, Flame, ChevronRight, Lock } from 'lucide-react'

// Dummy Data
const USER_DATA = {
  name: 'Investor Pemula',
  xp: 2450,
  nextTierXp: 3000,
  tier: 'Silver Steer',
  streak: 12,
  coins: 450
}

const DAILY_QUESTS = [
  { id: 1, title: 'Selesaikan 2 Materi', reward: 50, progress: 1, total: 2, claimed: false },
  { id: 2, title: 'Jawab 5 Pertanyaan Benar', reward: 100, progress: 5, total: 5, claimed: false },
  { id: 3, title: 'Login selama 3 hari berturut-turut', reward: 150, progress: 3, total: 3, claimed: true },
]

const LEADERBOARD = [
  { rank: 1, name: 'Budi Hartono', xp: 12500, tier: 'Gold Bull' },
  { rank: 2, name: 'Siskaeee Invest', xp: 11200, tier: 'Gold Bull' },
  { rank: 3, name: 'Crypto King', xp: 9800, tier: 'Silver Steer' },
  { rank: 14, name: 'Investor Pemula', xp: 2450, tier: 'Silver Steer', isMe: true },
]

const STORE_ITEMS = [
  { id: 1, name: 'Streak Freeze', desc: 'Lindungi streak kamu jika absen 1 hari.', price: 200, icon: <Flame size={24} color="#ff9800" /> },
  { id: 2, name: 'Avatar Frame: Diamond', desc: 'Bingkai profil eksklusif.', price: 1000, icon: <Crown size={24} color="#3b82f6" /> },
  { id: 3, name: 'Double XP (24 Jam)', desc: 'Dapatkan XP 2x lipat dari setiap materi.', price: 500, icon: <Zap size={24} color="#8b5cf6" /> },
]

export default function Rewards() {
  const [quests, setQuests] = useState(DAILY_QUESTS)
  const [coins, setCoins] = useState(USER_DATA.coins)

  const handleClaim = (q) => {
    if (q.progress >= q.total && !q.claimed) {
      setQuests(quests.map(quest => quest.id === q.id ? { ...quest, claimed: true } : quest))
      setCoins(prev => prev + q.reward)
    }
  }

  const handleBuy = (price) => {
    if (coins >= price) {
      setCoins(prev => prev - price)
      alert('Pembelian berhasil! Item telah ditambahkan ke akun Anda.')
    } else {
      alert('Koin tidak mencukupi!')
    }
  }

  const xpPercentage = (USER_DATA.xp / USER_DATA.nextTierXp) * 100

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', paddingBottom: 60 }}>
      {/* Header Profile & Progress */}
      <div style={{ 
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', 
        borderRadius: 24, padding: 32, color: 'white', marginBottom: 32,
        boxShadow: '0 12px 24px rgba(17, 24, 39, 0.15)', position: 'relative', overflow: 'hidden'
      }}>
        {/* Decor */}
        <div style={{ position: 'absolute', right: -20, top: -40, opacity: 0.1, transform: 'rotate(15deg)' }}>
          <Trophy size={200} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 32, alignItems: 'center' }}>
          {/* Avatar / Tier Badge */}
          <div style={{ 
            width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #e5e7eb, #9ca3af)',
            border: '4px solid #4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }}>
            <Shield size={48} color="#4b5563" />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{USER_DATA.tier}</h2>
                <p style={{ color: '#9ca3af', fontSize: 15, fontWeight: 500 }}>{USER_DATA.xp} XP / {USER_DATA.nextTierXp} XP menuju Gold Bull</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 999 }}>
                  <Star size={18} fill="#fbbf24" color="#fbbf24" />
                  <span style={{ fontWeight: 800, fontSize: 18, color: '#fbbf24' }}>{coins} Koin</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ 
                width: `${xpPercentage}%`, height: '100%', 
                background: 'linear-gradient(90deg, #00D166, #00a652)',
                borderRadius: 999, transition: 'width 1s ease-out'
              }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32 }}>
        
        {/* Left Column: Quests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Target size={24} color="#7C4DFF" />
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>Misi Harian</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {quests.map(q => {
                const isCompleted = q.progress >= q.total
                return (
                  <div key={q.id} style={{ 
                    background: 'white', border: '1px solid #e2e5ea', borderRadius: 16, padding: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{q.title}</h4>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ flex: 1, height: 8, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ 
                            width: `${(q.progress / q.total) * 100}%`, height: '100%', 
                            background: isCompleted ? '#00D166' : '#7C4DFF', borderRadius: 999
                          }} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', minWidth: 40 }}>
                          {q.progress} / {q.total}
                        </span>
                      </div>
                    </div>

                    <div>
                      {q.claimed ? (
                        <div style={{ padding: '8px 16px', background: '#f3f4f6', color: '#9ca3af', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
                          Diklaim
                        </div>
                      ) : isCompleted ? (
                        <button onClick={() => handleClaim(q)} style={{ 
                          padding: '8px 20px', background: '#00D166', color: 'white', borderRadius: 12, 
                          fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0, 209, 102, 0.3)', transition: 'transform 0.1s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          Klaim {q.reward} <Star size={12} fill="white" style={{display:'inline', position:'relative', top:1}} />
                        </button>
                      ) : (
                        <div style={{ padding: '8px 16px', border: '2px solid #e5e7eb', color: '#9ca3af', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
                          +{q.reward} Koin
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Leaderboard & Store */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* Leaderboard Snippet */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Trophy size={24} color="#fbbf24" />
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>Papan Peringkat</h3>
            </div>
            
            <div style={{ background: 'white', border: '1px solid #e2e5ea', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              {LEADERBOARD.map((user, idx) => (
                <div key={user.rank} style={{ 
                  display: 'flex', alignItems: 'center', padding: '16px 20px',
                  background: user.isMe ? '#f0fdf4' : 'transparent',
                  borderBottom: idx !== LEADERBOARD.length - 1 ? '1px solid #e2e5ea' : 'none'
                }}>
                  <div style={{ width: 28, fontWeight: 800, color: user.rank <= 3 ? '#fbbf24' : '#9ca3af', fontSize: 16 }}>
                    {user.rank}
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e5e7eb', marginRight: 16 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: user.isMe ? '#00a652' : '#111827', fontSize: 15 }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{user.tier}</div>
                  </div>
                  <div style={{ fontWeight: 800, color: '#111827' }}>
                    {user.xp} <span style={{ fontSize: 11, color: '#9ca3af' }}>XP</span>
                  </div>
                </div>
              ))}
              <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid #e2e5ea', background: '#f9fafb', cursor: 'pointer', color: '#00D166', fontWeight: 700, fontSize: 13 }}>
                Lihat Semua Peringkat
              </div>
            </div>
          </section>

          {/* Store */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Star size={24} color="#f97316" fill="#f97316" />
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>Toko Hadiah</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {STORE_ITEMS.map(item => (
                <div key={item.id} style={{ 
                  background: 'white', border: '1px solid #e2e5ea', borderRadius: 16, padding: 16,
                  display: 'flex', gap: 16, alignItems: 'center'
                }}>
                  <div style={{ width: 48, height: 48, background: '#f3f4f6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{item.name}</h4>
                    <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                  <button onClick={() => handleBuy(item.price)} style={{
                    padding: '8px 16px', background: 'transparent', border: '2px solid #e5e7eb',
                    borderRadius: 12, color: '#111827', fontWeight: 800, fontSize: 14, cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.color = '#d97706' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#111827' }}
                  >
                    {item.price} <Star size={12} fill="currentColor" style={{display:'inline', position:'relative', top:1}} />
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
