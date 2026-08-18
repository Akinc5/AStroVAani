import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Astrologers from './pages/Astrologers'
import AstroMall from './pages/AstroMall'
import AstrologerDashboard from './pages/AstrologerDashboard'
import Horoscope from './pages/Horoscope'
import Consultations from './pages/Consultations'
import FreeServices from './pages/FreeServices'
import Calculators from './pages/Calculators'
import Panchang from './pages/Panchang'
import Shop from './pages/Shop'
import Blog from './pages/Blog'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

        {!showSplash && (
          <div className="app-container">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/astrologers" element={<Astrologers />} />
                <Route path="/astromall" element={<AstroMall />} />
                <Route path="/horoscope" element={<Horoscope />} />
                <Route path="/consultations" element={<Consultations />} />
                <Route path="/free-services" element={<FreeServices />} />
                <Route path="/calculators" element={<Calculators />} />
                <Route path="/panchang" element={<Panchang />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/dashboard" element={<AstrologerDashboard />} />
              </Routes>
            </main>
          </div>
        )}
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
