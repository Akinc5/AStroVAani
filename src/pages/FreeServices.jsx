import { BookOpen, Heart, Hash, Star, Sparkles, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'kundli', title: 'Free Kundli', subtitle: 'Birth Chart Analysis',
    desc: 'Get your detailed Vedic birth chart with planetary positions, house analysis, and life predictions.',
    icon: <BookOpen size={32} />, color: '#a855f7', link: '/calculators',
  },
  {
    id: 'matching', title: 'Kundli Matching', subtitle: 'Compatibility Score',
    desc: 'Check compatibility between two people with Ashtakoot matching and Manglik analysis.',
    icon: <Heart size={32} />, color: '#f43f5e', link: '/calculators',
  },
  {
    id: 'numerology', title: 'Numerology', subtitle: 'Name & Date Analysis',
    desc: 'Discover your life path number, destiny number, and soul urge number from your name and birth date.',
    icon: <Hash size={32} />, color: '#fbbf24', link: '/calculators',
  },
  {
    id: 'love', title: 'Love Compatibility', subtitle: 'Zodiac Match',
    desc: 'Find how compatible you are with your partner based on your zodiac signs and birth charts.',
    icon: <Star size={32} />, color: '#ec4899', link: '/calculators',
  },
  {
    id: 'tarot', title: 'Daily Tarot', subtitle: 'Card Reading',
    desc: 'Pull your daily tarot card and receive guidance for your day ahead with detailed interpretations.',
    icon: <Sparkles size={32} />, color: '#38bdf8', link: '/horoscope',
  },
  {
    id: 'panchang', title: 'Panchang', subtitle: "Today's Auspicious Times",
    desc: "Find today's Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, and Brahma Muhurta.",
    icon: <Moon size={32} />, color: '#34d399', link: '/panchang',
  },
];

export default function FreeServices() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, marginBottom: '8px',
        background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Free Astrology Services</h1>
      <p style={{ color: '#9ca3af', marginBottom: '40px', fontSize: '15px' }}>
        Powerful astrological tools — completely free, no account required.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {services.map(s => (
          <div
            key={s.id}
            onClick={() => navigate(s.link)}
            style={{
              padding: '28px', borderRadius: '20px', cursor: 'pointer',
              background: 'rgba(20,20,28,0.6)', backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 20px 40px ${s.color}25`;
              e.currentTarget.style.borderColor = `${s.color}50`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            }}
          >
            {/* Background glow */}
            <div style={{
              position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px',
              borderRadius: '50%', background: s.color, opacity: 0.08, filter: 'blur(40px)',
              pointerEvents: 'none',
            }} />

            <div style={{
              width: '60px', height: '60px', borderRadius: '16px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30`,
            }}>
              {s.icon}
            </div>

            <div style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: '999px',
              background: `${s.color}15`, color: s.color, fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.5px', marginBottom: '10px',
            }}>
              FREE
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{s.title}</h3>
            <p style={{ fontSize: '12px', color: s.color, fontWeight: 600, marginBottom: '10px' }}>{s.subtitle}</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.6' }}>{s.desc}</p>

            <div style={{
              marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: s.color, fontSize: '13px', fontWeight: 600,
            }}>
              Explore →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
