import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard'; // <-- Pastikan ini di-import
import DashboardLayout from './components/DashboardLayout';
import Chatbot from './components/Chatbot/Chatbot';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

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
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;