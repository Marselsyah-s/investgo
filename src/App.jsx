<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard'; // <-- Pastikan ini di-import
import DashboardLayout from './components/DashboardLayout';
import Chatbot from './components/Chatbot/Chatbot';
import './index.css';
=======
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
import Profile from './pages/Profile'
import CharakterQuiz from './components/CharakterQuiz/CharakterQuiz'
import './index.css'
>>>>>>> c1d81a909cfdf296a2e6def808d9d42d01bd296a

function App() {
  const [balance, setBalance] = useState(2000000);

  const handleTransaction = (amount) => {
    setBalance(prev => prev + amount);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD

        {/* Rute Dashboard Utama */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        {/* Rute AI Tutor */}
        <Route
          path="/dashboard/ai-tutor"
          element={
            <DashboardLayout>
              <Chatbot />
            </DashboardLayout>
          }
=======
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
>>>>>>> c1d81a909cfdf296a2e6def808d9d42d01bd296a
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;