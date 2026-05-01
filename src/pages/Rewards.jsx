import React, { useState, useEffect } from 'react'
import { Trophy, Star, Target, Zap, Shield, Crown, Flame, ChevronRight, Lock } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { supabase } from '../lib/supabase'

// Nilai fallback
const FALLBACK_USER = {
  name: 'Investor Pemula',
  coins: 0
}

// Store Items tetap dummy karena belum ada tabel transaksi koin
const STORE_ITEMS = [
  { id: 1, name: 'Streak Freeze', desc: 'Lindungi streak kamu jika absen 1 hari.', price: 200, icon: <Flame size={24} color="#ff9800" /> },
  { id: 2, name: 'Avatar Frame: Diamond', desc: 'Bingkai profil eksklusif.', price: 1000, icon: <Crown size={24} color="#3b82f6" /> },
  { id: 3, name: 'Double XP (24 Jam)', desc: 'Dapatkan XP 2x lipat dari setiap materi.', price: 500, icon: <Zap size={24} color="#8b5cf6" /> },
]

export default function Rewards() {
  const { totalXp, completedLessons, loading: progressLoading } = useProgress()
  const [user, setUser] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [quests, setQuests] = useState([])
  const [coins, setCoins] = useState(FALLBACK_USER.coins)
  const [claimedQuests, setClaimedQuests] = useState([])
  const [showNoCoinsModal, setShowNoCoinsModal] = useState(false)
  const [inventory, setInventory] = useState([])

  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      if (data?.user) {
        setUser(data.user)
        fetchUserStats(data.user.id)
      }
    })
    fetchGlobalLeaderboard()
  }, [])

  const fetchUserStats = async (userId) => {
    const { data, error } = await supabase
      .from('user_stats')
      .select('coins, claimed_quests, inventory')
      .eq('user_id', userId)
      .maybeSingle()
    
    if (data) {
      setCoins(data.coins ?? 0)
      setClaimedQuests(data.claimed_quests || [])
      setInventory(data.inventory || [])
    } else {
      setCoins(0)
      setClaimedQuests([])
      setInventory([])
    }
  }

  const fetchGlobalLeaderboard = async () => {
    const { data, error } = await supabase.from('user_progress').select('user_id, xp_earned')
    if (!error && data) {
      // Group by user_id
      const xpByUser = data.reduce((acc, row) => {
        acc[row.user_id] = (acc[row.user_id] || 0) + row.xp_earned
        return acc
      }, {})

      const leaderboardData = Object.keys(xpByUser).map(userId => {
        const xp = xpByUser[userId]
        return {
          user_id: userId,
          xp: xp,
          tier: getTierInfo(xp).name,
        }
      })
      setLeaderboard(leaderboardData)
    }
  }

  // Generate misi berdasarkan progress asli
  useEffect(() => {
    if (!progressLoading && user) {
      const safeClaimed = claimedQuests.map(String)
      setQuests([
        { id: 1, title: 'Selesaikan 2 Materi', reward: 50, progress: Math.min(completedLessons.size, 2), total: 2, claimed: safeClaimed.includes(String(1)) },
        { id: 2, title: 'Selesaikan 5 Materi', reward: 150, progress: Math.min(completedLessons.size, 5), total: 5, claimed: safeClaimed.includes(String(2)) },
        { id: 3, title: 'Kumpulkan 1000 XP', reward: 200, progress: Math.min(totalXp, 1000), total: 1000, claimed: safeClaimed.includes(String(3)) }
      ])
    }
  }, [completedLessons.size, totalXp, progressLoading, user, claimedQuests])

  const handleClaim = async (q) => {
    if (q.progress >= q.total && !q.claimed && user) {
      try {
        // Ambil token sesi saat ini dari Supabase
        const { data: sessionData } = await supabase.auth.getSession()
        const token = sessionData.session?.access_token

        // Panggil API Backend (Express) untuk memvalidasi dan menambahkan koin
        const response = await fetch('http://localhost:5000/api/claim-quest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            questId: q.id,
            rewardCoins: q.reward
          })
        })

        const result = await response.json()

        if (response.ok) {
          // Hanya update UI (Koin bertambah & tombol berubah jadi Diklaim) JIKA backend menyetujui
          setCoins(result.coins)
          setClaimedQuests(result.claimed_quests)
        } else {
          // Jika gagal (misal user mencoba nge-hack dengan ngeklik 2x pakai script)
          alert(`Gagal klaim: ${result.error}`)
        }
      } catch (error) {
        console.error('API Error:', error)
        alert('Server backend (Express) sedang offline. Pastikan npm run dev dijalankan di folder server.')
      }
    }
  }

  const handleBuy = async (item) => {
    if (!user) return alert('Silakan login terlebih dahulu.')
    if (coins < item.price) {
      setShowNoCoinsModal(true)
      return
    }
    if (inventory.includes(String(item.id))) return alert('Item sudah kamu miliki!')

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData.session?.access_token

      const response = await fetch('http://localhost:5000/api/buy-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          itemId: item.id,
          price: item.price
        })
      })

      const result = await response.json()

      if (response.ok) {
        setCoins(result.coins)
        setInventory(result.inventory)
        alert('Pembelian berhasil! Item telah ditambahkan ke akun Anda.')
      } else {
        alert(`Gagal membeli: ${result.error}`)
      }
    } catch (error) {
      console.error('API Error:', error)
      alert('Server backend (Express) sedang offline. Pastikan npm run dev dijalankan di folder server.')
    }
  }

  const getTierInfo = (xp) => {
    if (xp < 500) return { name: 'Cacing Pemula', nextTierXp: 500 }
    if (xp < 1500) return { name: 'Bronze Calf', nextTierXp: 1500 }
    if (xp < 4000) return { name: 'Silver Steer', nextTierXp: 4000 }
    if (xp < 10000) return { name: 'Gold Bull', nextTierXp: 10000 }
    return { name: 'Diamond Dragon', nextTierXp: xp }
  }

  const currentTier = getTierInfo(totalXp)
  const xpPercentage = totalXp >= currentTier.nextTierXp ? 100 : (totalXp / currentTier.nextTierXp) * 100
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || FALLBACK_USER.name

  // Gabungkan leaderboard dari database dengan data user saat ini
  let mergedLeaderboard = [...leaderboard]
  // Pastikan user saat ini ada di array meskipun XP-nya 0
  if (user && !mergedLeaderboard.find(l => l.user_id === user.id)) {
    mergedLeaderboard.push({ user_id: user.id, xp: totalXp, tier: currentTier.name })
  }
  
  // Sort dan format
  const dynamicLeaderboard = mergedLeaderboard
    .sort((a, b) => b.xp - a.xp)
    .map((item, idx) => ({
      ...item,
      rank: idx + 1,
      isMe: user && item.user_id === user.id,
      name: user && item.user_id === user.id ? userName + ' (Kamu)' : `Investor #${item.user_id.substring(0, 4).toUpperCase()}`
    }))

  if (progressLoading) return <div style={{ padding: 40, textAlign: 'center', fontWeight: 'bold' }}>Memuat data hadiah...</div>

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
            border: inventory.includes('2') ? '4px solid #3b82f6' : '4px solid #4b5563', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: inventory.includes('2') ? '0 0 20px rgba(59, 130, 246, 0.6)' : '0 8px 16px rgba(0,0,0,0.2)',
            overflow: 'hidden'
          }}>
            {inventory.includes('2') ? <Crown size={48} color="white" /> : <Shield size={48} color="#4b5563" />}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {userName}
                  {inventory.includes('3') && <span style={{ background: '#8b5cf6', color: 'white', padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 800 }}>Double XP Aktif</span>}
                  {inventory.includes('1') && <span style={{ background: '#f97316', color: 'white', padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 800 }}>Streak Freeze Aktif</span>}
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{currentTier.name}</h2>
                <p style={{ color: '#9ca3af', fontSize: 15, fontWeight: 500 }}>
                  {totalXp} XP {totalXp < currentTier.nextTierXp ? `/ ${currentTier.nextTierXp} XP menuju Rank Selanjutnya` : '(MAX LEVEL)'}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 999 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', background: '#FFC107',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 13, fontWeight: 900
                  }}>C</div>
                  <span style={{ fontWeight: 800, fontSize: 18, color: '#FFC107' }}>{coins.toLocaleString('id-ID')} Koin</span>
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
                          Klaim {q.reward} <div style={{width: 14, height: 14, borderRadius: '50%', background: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#00D166', fontSize: 9, fontWeight: 900, position: 'relative', top: -1, marginLeft: 2}}>C</div>
                        </button>
                      ) : (
                        <div style={{ padding: '8px 16px', border: '2px solid #e5e7eb', color: '#9ca3af', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
                          +{q.reward} <div style={{width: 14, height: 14, borderRadius: '50%', background: '#e5e7eb', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 900, position: 'relative', top: -1, marginLeft: 2}}>C</div>
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
              {dynamicLeaderboard.slice(0, 5).map((entry, idx) => (
                <div key={entry.rank} style={{ 
                  display: 'flex', alignItems: 'center', padding: '16px 20px',
                  background: entry.isMe ? '#f0fdf4' : 'transparent',
                  borderBottom: idx !== Math.min(dynamicLeaderboard.length, 5) - 1 ? '1px solid #e2e5ea' : 'none'
                }}>
                  <div style={{ width: 28, fontWeight: 800, color: entry.rank <= 3 ? '#fbbf24' : '#9ca3af', fontSize: 16 }}>
                    {entry.rank}
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e5e7eb', marginRight: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {entry.isMe && user?.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Me" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#9ca3af' }}>
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: entry.isMe ? '#00a652' : '#111827', fontSize: 15 }}>{entry.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{entry.tier}</div>
                  </div>
                  <div style={{ fontWeight: 800, color: '#111827' }}>
                    {entry.xp} <span style={{ fontSize: 11, color: '#9ca3af' }}>XP</span>
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
                  {inventory.includes(String(item.id)) ? (
                    <div style={{ padding: '8px 16px', background: '#f3f4f6', color: '#9ca3af', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
                      Dimiliki
                    </div>
                  ) : (
                    <button onClick={() => handleBuy(item)} style={{
                      padding: '8px 16px', background: 'transparent', border: '2px solid #e5e7eb',
                      borderRadius: 12, color: '#111827', fontWeight: 800, fontSize: 14, cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.color = '#d97706' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#111827' }}
                    >
                      {item.price} <div style={{width: 14, height: 14, borderRadius: '50%', background: '#FFC107', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 900, position: 'relative', top: -1, marginLeft: 2}}>C</div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      {/* Insufficient Coins Modal */}
      {showNoCoinsModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, animation: 'fadeIn 0.2s ease-out', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'white', width: '90%', maxWidth: 400, borderRadius: 32, padding: 40,
            textAlign: 'center', boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
            animation: 'modalSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes modalSlideUp { 
                from { opacity: 0; transform: translateY(30px) scale(0.9); } 
                to { opacity: 1; transform: translateY(0) scale(1); } 
              }
            `}</style>
            
            <div style={{ 
              width: 90, height: 90, background: '#fff9c4', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px'
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: '#FFC107',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 28, fontWeight: 900, boxShadow: '0 6px 12px rgba(255,193,7,0.4)'
              }}>C</div>
            </div>

            <h3 style={{ fontSize: 26, fontWeight: 800, color: '#111827', marginBottom: 12 }}>Koin Tidak Cukup</h3>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6, marginBottom: 36 }}>
              Yah! Kamu belum punya cukup koin untuk membeli item ini. Terus kumpulkan koin dari kuis dan misi harian ya!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button 
                onClick={() => setShowNoCoinsModal(false)}
                style={{
                  width: '100%', padding: '18px', background: '#FFC107', color: 'white',
                  borderRadius: 20, border: 'none', fontWeight: 800, fontSize: 16,
                  cursor: 'pointer', boxShadow: '0 4px 0 #ff8f00', transition: 'all 0.1s'
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'translateY(2px)'}
                onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                SIAP, LANJUT BELAJAR!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
