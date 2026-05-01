import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import MarketSim from './components/MarketSim/MarketSim'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import LessonPage from './pages/LessonPage'
import Rewards from './pages/Rewards'
import './index.css'

function App() {
  const [balance, setBalance] = useState(2000000);

  const handleTransaction = (amount) => {
    setBalance(prev => prev + amount);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard routes wrapped in Layout */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/rewards" element={<DashboardLayout><Rewards /></DashboardLayout>} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
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
