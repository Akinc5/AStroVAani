import { useState, useEffect } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleComplete();
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className={`splash-screen ${!isVisible ? 'hidden' : ''}`}>
      <div className="spline-container">
        <spline-viewer url="https://prod.spline.design/fLsJsrVaJMsfh8Zy/scene.splinecode" />
      </div>

      {/* Brand overlay at top */}
      <div style={{
        position: 'absolute', top: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10,
        animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden',
          border: '2px solid rgba(251,191,36,0.5)',
          boxShadow: '0 0 24px rgba(168,85,247,0.6)',
        }}>
          <img src="/logo.png" alt="AstroVaani" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span style={{
          fontWeight: 800, fontSize: '22px', letterSpacing: '0.3px',
          background: 'linear-gradient(90deg, #fbbf24 0%, #f0abfc 60%, #a855f7 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontFamily: "'Outfit', sans-serif",
        }}>AstroVaani</span>
      </div>

      {/* Enter button */}
      <div className="splash-btn-container">
        <button
          onClick={handleComplete}
          style={{
            padding: '14px 40px', borderRadius: '999px', border: 'none',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            color: '#1a1a1a', fontWeight: 800, fontSize: '16px',
            cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            boxShadow: '0 8px 30px rgba(251,191,36,0.45)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(251,191,36,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(251,191,36,0.45)'; }}
        >
          ✦ Enter Universe
        </button>
      </div>
    </div>
  );
}
