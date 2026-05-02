import React, { useState, useEffect } from 'react'
import { Award, Zap, CalendarDays, Trophy } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useProgress } from '../hooks/useProgress'

export default function RightSidebar() {
  const { totalXp, loading: progressLoading } = useProgress()
  const [user, setUser] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    // Initial fetch
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUser(user)
    })

    // Listen for auth/metadata changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
    })

    fetchGlobalLeaderboard()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchGlobalLeaderboard = async () => {
    const { data, error } = await supabase.from('user_progress').select('user_id, xp_earned')
    if (!error && data) {
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

  const getTierInfo = (xp) => {
    if (xp < 500) return { name: 'Cacing Pemula', nextTierXp: 500 }
    if (xp < 1500) return { name: 'Bronze Calf', nextTierXp: 1500 }
    if (xp < 4000) return { name: 'Silver Steer', nextTierXp: 4000 }
    if (xp < 10000) return { name: 'Gold Bull', nextTierXp: 10000 }
    return { name: 'Diamond Dragon', nextTierXp: xp }
  }

  const currentTier = getTierInfo(totalXp)
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Investor Pemula'

  let mergedLeaderboard = [...leaderboard]
  if (user && !mergedLeaderboard.find(l => l.user_id === user.id)) {
    mergedLeaderboard.push({ user_id: user.id, xp: totalXp, tier: currentTier.name })
  }
  
  const dynamicLeaderboard = mergedLeaderboard
    .sort((a, b) => b.xp - a.xp)
    .map((item, idx) => ({
      ...item,
      rank: idx + 1,
      isMe: user && item.user_id === user.id,
      name: user && item.user_id === user.id ? userName + ' (Kamu)' : `Investor #${item.user_id.substring(0, 4).toUpperCase()}`
    }))

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Mascot & Speech Bubble */}
      <div style={{ position: 'relative' }}>
        <div style={{
          background: '#a685ff',
          borderRadius: 24,
          borderBottomLeftRadius: 4,
          padding: 20,
          color: 'white',
          marginBottom: 16,
          boxShadow: '0 8px 24px rgba(124,77,255,0.2)'
        }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: '#3d1d99' }}>Ingat Strategi Ini!</div>
          <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: '#3d1d99', opacity: 0.9 }}>
            "Jangan menaruh semua telurmu dalam satu keranjang. Diversifikasi adalah kunci utama!"
          </p>
        </div>
        <img src="/mascot.png" alt="Mascot" style={{ width: 150, height: 150, objectFit: 'contain' }} />
      </div>

      {/* Mini Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '2px solid #00D166' }}>
          <Award size={20} color="#00D166" style={{ marginBottom: 12 }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '1px', marginBottom: 4 }}>RANK</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#111827' }}>
            #{dynamicLeaderboard.find(l => l.isMe)?.rank || '-'}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '2px solid #a685ff' }}>
          <Zap size={20} color="#7C4DFF" style={{ marginBottom: 12 }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '1px', marginBottom: 4 }}>TOTAL XP</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#111827' }}>{totalXp}</div>
        </div>
      </div>

      {/* Leaderboard Card - Matching Rewards Page style */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Trophy size={20} color="#fbbf24" />
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: 0 }}>Papan Skor</h3>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#00D166', cursor: 'pointer' }}>Lihat Semua</span>
        </div>
        
        <div style={{ background: 'white', border: '1px solid #e2e5ea', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {dynamicLeaderboard.slice(0, 5).map((u, idx) => (
            <div key={u.rank} style={{ 
              display: 'flex', alignItems: 'center', padding: '12px 16px',
              background: u.isMe ? '#f0fdf4' : 'transparent',
              borderBottom: idx !== Math.min(dynamicLeaderboard.length, 5) - 1 ? '1px solid #e2e5ea' : 'none'
            }}>
              <div style={{ width: 24, fontWeight: 800, color: u.rank <= 3 ? '#fbbf24' : '#9ca3af', fontSize: 14 }}>
                {u.rank}
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e5e7eb', marginRight: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {u.isMe && user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Me" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#9ca3af' }}>
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: u.isMe ? '#00a652' : '#111827', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                  {u.name}
                </div>
                <div style={{ fontSize: 10, color: '#6b7280' }}>{u.tier}</div>
              </div>
              <div style={{ fontWeight: 800, color: '#111827', fontSize: 13 }}>
                {u.xp} <span style={{ fontSize: 10, color: '#9ca3af' }}>XP</span>
              </div>
            </div>
          ))}
          {dynamicLeaderboard.length === 0 && (
            <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>Memuat peringkat...</div>
          )}
        </div>
      </section>

      {/* Tantangan Harian */}
      <div style={{ background: '#FFC107', borderRadius: 24, padding: 24, color: '#111827', boxShadow: '0 8px 24px rgba(255,193,7,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <CalendarDays size={20} />
          <h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Tantangan Harian</h3>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 20, fontWeight: 500 }}>
          Prediksi 3 saham yang akan hijau hari ini untuk mendapatkan 200 XP!
        </p>
        <button style={{
          width: '100%', padding: '12px', background: '#4a3500', color: 'white',
          border: 'none', borderRadius: 9999, fontWeight: 700, fontSize: 14, cursor: 'pointer'
        }}>
          Mulai Tantangan
        </button>
      </div>

    </div>
  )
}

