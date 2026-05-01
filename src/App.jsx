import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MarketSim from './components/MarketSim/MarketSim'
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
        <Route 
          path="/simulator" 
          element={
            <MarketSim 
              balance={balance} 
              onTransaction={handleTransaction} 
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
