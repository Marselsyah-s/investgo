import { Award, Zap, CalendarDays } from 'lucide-react'

export default function RightSidebar() {
  const leaderboard = [
    { rank: 1, name: 'Kevin Wijaya', xp: '4,200', img: 'https://ui-avatars.com/api/?name=Kevin+Wijaya&background=00D166&color=fff', medal: true },
    { rank: 2, name: 'Siska Amelia', xp: '3,850', img: 'https://ui-avatars.com/api/?name=Siska+Amelia&background=374151&color=fff' },
    { rank: 3, name: 'Budi Santoso', xp: '3,100', img: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=ff8f00&color=fff' },
  ]

  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Mascot & Speech Bubble */}
      <div style={{ position: 'relative' }}>
        <div style={{
          background: '#a685ff', // Light purple
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
        <img src="/mascot.png" alt="Mascot" style={{ width: 100, height: 100, objectFit: 'contain' }} />
      </div>

      {/* Mini Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '2px solid #00D166' }}>
          <Award size={20} color="#00D166" style={{ marginBottom: 12 }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '1px', marginBottom: 4 }}>RANK</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#111827' }}>#14</div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '2px solid #a685ff' }}>
          <Zap size={20} color="#7C4DFF" style={{ marginBottom: 12 }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '1px', marginBottom: 4 }}>XP GOAL</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#111827' }}>85%</div>
        </div>
      </div>

      {/* Leaderboard Card */}
      <div style={{ background: 'white', borderRadius: 24, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 800, fontSize: 18, color: '#111827', margin: 0 }}>Leaderboard</h3>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#00D166', cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {leaderboard.map((user, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: i === 0 ? '#fffde7' : 'transparent',
              padding: i === 0 ? '12px 16px' : '0 16px',
              borderRadius: 16,
              marginLeft: i === 0 ? -16 : 0,
              marginRight: i === 0 ? -16 : 0,
              borderLeft: i === 0 ? '4px solid #FFC107' : 'none'
            }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: i === 0 ? '#FFC107' : '#6b7280', width: 20 }}>{user.rank}</div>
              <img src={user.img} alt={user.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{user.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{user.xp} XP</div>
              </div>
              {user.medal && <div style={{ color: '#FFC107' }}>🏆</div>}
            </div>
          ))}

          <div style={{ height: 1, background: '#e2e5ea', margin: '8px 0' }} />

          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            background: '#F0F2F5', padding: '12px 16px', borderRadius: 16,
            marginLeft: -16, marginRight: -16
          }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#00D166', width: 20 }}>14</div>
            <img src="https://ui-avatars.com/api/?name=Anda&background=1f2937&color=fff" alt="Anda" style={{ width: 40, height: 40, borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>Anda (Level 12)</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>2,450 XP</div>
            </div>
          </div>
        </div>
      </div>

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
