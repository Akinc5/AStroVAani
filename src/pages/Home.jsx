import { Link } from 'react-router-dom';
import { MessageCircle, Phone, BookOpen, Star, Sparkles, Video, ArrowRight, Shield, Clock, Users } from 'lucide-react';

const services = [
  { title: 'Chat with Astrologer', icon: <MessageCircle size={28} />, color: '#a855f7', link: '/consultations', desc: 'Instant text chat' },
  { title: 'Talk to Astrologer', icon: <Phone size={28} />, color: '#fbbf24', link: '/consultations', desc: 'Voice call session' },
  { title: 'Free Kundli', icon: <BookOpen size={28} />, color: '#2dd4bf', link: '/free-services', desc: 'Birth chart analysis' },
  { title: 'Kundli Matching', icon: <Star size={28} />, color: '#f43f5e', link: '/calculators', desc: 'Compatibility score' },
  { title: 'Live Astrologers', icon: <Video size={28} />, color: '#38bdf8', link: '/consultations', desc: 'Face-to-face session' },
  { title: 'AstroMall', icon: <Sparkles size={28} />, color: '#eab308', link: '/astromall', desc: 'Sacred products' },
];

const topAstrologers = [
  { id: 1, name: 'Astro Rahul', skill: 'Vedic · Tarot', exp: '5 Yrs', rating: 4.9, reviews: 2341, img: 'https://i.pravatar.cc/150?u=rahul', online: true },
  { id: 2, name: 'Tarot Priya', skill: 'Tarot · Numerology', exp: '8 Yrs', rating: 5.0, reviews: 3120, img: 'https://i.pravatar.cc/150?u=priya', online: true },
  { id: 3, name: 'Vastu Amit', skill: 'Vedic · Vastu', exp: '12 Yrs', rating: 4.8, reviews: 1890, img: 'https://i.pravatar.cc/150?u=amit', online: false },
  { id: 4, name: 'Astro Neha', skill: 'Palmistry · Psychic', exp: '6 Yrs', rating: 4.9, reviews: 2780, img: 'https://i.pravatar.cc/150?u=neha', online: true },
];

const stats = [
  { icon: <Users size={22} />, value: '50K+', label: 'Happy Users', color: '#a855f7' },
  { icon: <Shield size={22} />, value: '500+', label: 'Verified Astrologers', color: '#fbbf24' },
  { icon: <Clock size={22} />, value: '24/7', label: 'Available', color: '#2dd4bf' },
  { icon: <Star size={22} fill="#f43f5e" color="#f43f5e" />, value: '4.9★', label: 'Average Rating', color: '#f43f5e' },
];

export default function Home() {
  return (
    <div className="animate-fade-in">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', minHeight: '92vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        padding: '100px 20px 60px',
      }}>
        {/* Spline 3D background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <spline-viewer url="https://prod.spline.design/fLsJsrVaJMsfh8Zy/scene.splinecode" />
        </div>

        {/* Gradient overlays for depth */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at center bottom, rgba(168,85,247,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', zIndex: 1, background: 'linear-gradient(to top, var(--color-bg-start), transparent)' }} />

        {/* Hero Content */}
        <div style={{
          position: 'relative', zIndex: 2, textAlign: 'center',
          maxWidth: '820px', padding: '56px 48px',
          background: 'rgba(6,6,12,0.55)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '32px', border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}>
          {/* Logo badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 18px', borderRadius: '999px', marginBottom: '28px',
            background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)',
          }}>
            <img src="/logo.png" alt="AstroVaani" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#c4b5fd', letterSpacing: '0.5px' }}>India's #1 Astrology Platform</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.1,
            letterSpacing: '-1px', marginBottom: '20px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f0abfc 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Discover Your<br />Cosmic Path
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#d1d5db',
            lineHeight: '1.75', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px',
          }}>
            Connect with India's most trusted astrologers. Get guidance on love, career, health, and destiny — powered by ancient Vedic wisdom.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/consultations" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', borderRadius: '999px', textDecoration: 'none',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              color: '#1a1a1a', fontWeight: 700, fontSize: '15px',
              boxShadow: '0 8px 24px rgba(251,191,36,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(251,191,36,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(251,191,36,0.35)'; }}
            >
              Talk to Astrologer <ArrowRight size={16} />
            </Link>
            <Link to="/horoscope" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', borderRadius: '999px', textDecoration: 'none',
              background: 'rgba(255,255,255,0.07)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)', fontWeight: 600, fontSize: '15px',
              backdropFilter: 'blur(10px)', transition: 'background 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
            >
              Daily Horoscope ✨
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────────────────────── */}
      <section style={{ padding: '0 20px', maxWidth: '1100px', margin: '-30px auto 0', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
          background: 'rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}>
          {stats.map(({ icon, value, label, color }) => (
            <div key={label} style={{
              padding: '28px 24px', textAlign: 'center',
              background: 'rgba(10,10,16,0.8)', backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              transition: 'background 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}10`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,16,0.8)'; }}
            >
              <div style={{ color }}>{icon}</div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#fff' }}>{value}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Grid ────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '12px', color: '#a855f7', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>What We Offer</p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff',
            background: 'linear-gradient(90deg, #fff 0%, #d1d5db 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Cosmic Services, Tailored for You</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '14px' }}>
          {services.map((service, index) => (
            <Link to={service.link} key={index} style={{
              textDecoration: 'none', padding: '28px 20px', borderRadius: '20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              background: 'rgba(16,16,24,0.7)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.07)',
              transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${service.color}25`;
                e.currentTarget.style.borderColor = `${service.color}50`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              {/* Corner glow */}
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px',
                borderRadius: '50%', background: service.color, opacity: 0.07, filter: 'blur(25px)',
                pointerEvents: 'none',
              }} />
              <div style={{
                width: '58px', height: '58px', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${service.color}18`, color: service.color,
                border: `1px solid ${service.color}30`,
                boxShadow: `0 0 20px ${service.color}15`,
              }}>
                {service.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px', lineHeight: 1.3 }}>{service.title}</h3>
                <p style={{ fontSize: '11px', color: '#9ca3af' }}>{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Astrologers ─────────────────────────────────────────── */}
      <section style={{ padding: '0 20px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Top Rated</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', margin: 0 }}>Elite Mystics</h2>
          </div>
          <Link to="/astrologers" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none',
            padding: '10px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
            color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)',
            background: 'rgba(251,191,36,0.07)', transition: 'background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,191,36,0.14)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(251,191,36,0.07)'; }}
          >
            View All Astrologers <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '18px' }}>
          {topAstrologers.map(astro => (
            <div key={astro.id} style={{
              borderRadius: '24px', overflow: 'hidden',
              background: 'rgba(14,14,22,0.8)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(168,85,247,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Top color band */}
              <div style={{ height: '6px', background: 'linear-gradient(90deg, #a855f7, #fbbf24)' }} />

              <div style={{ padding: '24px', textAlign: 'center' }}>
                {/* Avatar */}
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }}>
                  <img src={astro.img} alt={astro.name} style={{
                    width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover',
                    border: '2.5px solid rgba(168,85,247,0.5)',
                    boxShadow: '0 0 20px rgba(168,85,247,0.25)',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: '3px', right: '3px',
                    width: '13px', height: '13px', borderRadius: '50%',
                    background: astro.online ? '#22c55e' : '#6b7280',
                    border: '2px solid #0e0e16',
                  }} />
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{astro.name}</h3>
                <p style={{ fontSize: '12px', color: '#a855f7', fontWeight: 600, marginBottom: '4px' }}>{astro.skill}</p>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>{astro.exp} Experience</p>

                {/* Rating */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '5px 12px', borderRadius: '999px',
                  background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)',
                  marginBottom: '16px',
                }}>
                  <Star size={13} fill="#fbbf24" color="#fbbf24" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fbbf24' }}>{astro.rating}</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>({astro.reviews.toLocaleString()})</span>
                </div>

                <Link to="/consultations" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '10px', borderRadius: '12px', textDecoration: 'none',
                  background: astro.online ? 'linear-gradient(135deg, #a855f7, #7e22ce)' : 'rgba(255,255,255,0.05)',
                  color: astro.online ? '#fff' : '#6b7280',
                  fontSize: '13px', fontWeight: 600,
                  transition: 'filter 0.2s',
                }}
                  onMouseEnter={e => { if (astro.online) e.currentTarget.style.filter = 'brightness(1.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; }}
                >
                  <MessageCircle size={14} />
                  {astro.online ? 'Connect Now' : 'Currently Offline'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section style={{ padding: '0 20px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          borderRadius: '28px', overflow: 'hidden', position: 'relative',
          padding: '56px 48px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(251,191,36,0.1) 100%)',
          border: '1px solid rgba(168,85,247,0.2)',
          boxShadow: '0 0 80px rgba(168,85,247,0.1)',
        }}>
          {/* background star dots */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.4,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px', pointerEvents: 'none',
          }} />
          <img src="/logo.png" alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '20px',
            boxShadow: '0 0 30px rgba(168,85,247,0.6)', border: '2px solid rgba(251,191,36,0.4)',
          }} />
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#fff',
            marginBottom: '14px', position: 'relative',
          }}>Your Stars Are Waiting</h2>
          <p style={{ color: '#9ca3af', fontSize: '15px', maxWidth: '500px', margin: '0 auto 32px', position: 'relative', lineHeight: 1.7 }}>
            Get personalized readings from verified astrologers. First chat is on us.
          </p>
          <Link to="/consultations" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '15px 36px', borderRadius: '999px', textDecoration: 'none',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            color: '#1a1a1a', fontWeight: 800, fontSize: '15px',
            boxShadow: '0 8px 30px rgba(251,191,36,0.4)', position: 'relative',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Get Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
