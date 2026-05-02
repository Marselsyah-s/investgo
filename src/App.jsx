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
import Mentorship from './pages/Mentorship'
import './index.css'

function App() {
  const [balance, setBalance] = useState(2000000);

  const handleTransaction = (amount) => {
    setBalance(prev => prev + amount);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rute dari kode sebelumnya */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rute baru dari branch main */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<CharakterQuiz onComplete={(res) => {
          console.log("Quiz Selesai! Karakter:", res);
          // Simpan status bahwa user sudah pernah ikut kuis
          localStorage.setItem('hasTakenQuiz', 'true');
          // Arahkan ke halaman utama (dashboard)
          window.location.href = '/dashboard'; 
        }} />} />
        
        {/* Dashboard routes wrapped in Layout */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/rewards" element={<DashboardLayout><Rewards /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/tutor" element={<DashboardLayout><Chatbot /></DashboardLayout>} />
        <Route path="/mentorship" element={<DashboardLayout><Mentorship /></DashboardLayout>} />
        <Route 
          path="/sandbox" 
          element={
            <DashboardLayout>
              <MarketSim 
                balance={balance} 
                onTransaction={handleTransaction} 
              />
            </DashboardLayout>
          } 
        />
        
        {/* Redirect unknown routes for now */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
