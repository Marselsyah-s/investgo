import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout({ children }) {
  return (
<<<<<<< HEAD
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F9FA' }}>
=======
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F9FA' }}>
>>>>>>> 4843707375dd08229cb2f42f571706f7d944e0f7
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <main style={{ flex: 1, padding: '0 32px 32px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
