import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MarketSim from './components/MarketSim/MarketSim'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import LessonPage from './pages/LessonPage'
import Rewards from './pages/Rewards'
import Profile from './pages/Profile'
import CharakterQuiz from './components/CharakterQuiz/CharakterQuiz'
import Chatbot from './components/Chatbot/Chatbot'
import './index.css'

function App() {
  const [balance, setBalance] = useState(2000000)

  const handleTransaction = (amount) => {
    setBalance(prev => prev + amount)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Quiz Karakter */}
        <Route path="/quiz" element={<CharakterQuiz onComplete={(res) => {
          console.log("Quiz Selesai! Karakter:", res)
          localStorage.setItem('hasTakenQuiz', 'true')
          window.location.href = '/dashboard'
        }} />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/rewards" element={<DashboardLayout><Rewards /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />

        {/* Lesson */}
        <Route path="/lesson/:lessonId" element={<LessonPage />} />

        {/* AI Tutor */}
        <Route path="/dashboard/ai-tutor" element={<DashboardLayout><Chatbot /></DashboardLayout>} />

        {/* Market Simulator */}
        <Route
          path="/sandbox"
          element={
            <DashboardLayout>
              <MarketSim balance={balance} onTransaction={handleTransaction} />
            </DashboardLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
