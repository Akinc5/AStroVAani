import { useState } from 'react';
import { MessageCircle, Phone, Video, Star, Clock, Zap } from 'lucide-react';

const astrologers = [
  { id: 1, name: 'Astro Rahul', skill: 'Vedic, Tarot', exp: '5 Yrs', rating: 4.9, price: 25, status: 'online', img: 'https://i.pravatar.cc/150?u=rahul', languages: 'Hindi, English' },
  { id: 2, name: 'Tarot Priya', skill: 'Tarot, Numerology', exp: '8 Yrs', rating: 5.0, price: 35, status: 'online', img: 'https://i.pravatar.cc/150?u=priya', languages: 'Hindi, English, Tamil' },
  { id: 3, name: 'Vastu Amit', skill: 'Vedic, Vastu', exp: '12 Yrs', rating: 4.8, price: 20, status: 'busy', img: 'https://i.pravatar.cc/150?u=amit', languages: 'Hindi, Gujarati' },
  { id: 4, name: 'Astro Neha', skill: 'Palmistry, Psychic', exp: '6 Yrs', rating: 4.9, price: 30, status: 'online', img: 'https://i.pravatar.cc/150?u=neha', languages: 'Hindi, Marathi' },
  { id: 5, name: 'Pandit Suresh', skill: 'KP System, Prashna', exp: '20 Yrs', rating: 4.7, price: 50, status: 'online', img: 'https://i.pravatar.cc/150?u=suresh', languages: 'Hindi, Telugu' },
  { id: 6, name: 'Astro Kavita', skill: 'Lal Kitab, Gemstone', exp: '9 Yrs', rating: 4.8, price: 28, status: 'offline', img: 'https://i.pravatar.cc/150?u=kavita', languages: 'Hindi, Bengali' },
];

const tabs = [
  { id: 'chat', label: 'Chat', icon: <MessageCircle size={16} /> },
  { id: 'call', label: 'Call', icon: <Phone size={16} /> },
  { id: 'video', label: 'Video Call', icon: <Video size={16} /> },
];

const statusColor = { online: '#22c55e', busy: '#f59e0b', offline: '#6b7280' };
const statusLabel = { online: 'Online', busy: 'Busy', offline: 'Offline' };

export default function Consultations() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, marginBottom: '8px',
        background: 'linear-gradient(90deg, #a855f7, #ec4899)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Talk to an Astrologer</h1>
      <p style={{ color: '#9ca3af', marginBottom: '36px', fontSize: '15px' }}>Connect instantly via Chat, Voice Call, or Video.</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '10px 20px', borderRadius: '999px', fontWeight: 600, fontSize: '14px',
            cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'inherit',
            background: activeTab === t.id
              ? 'linear-gradient(135deg, #a855f7, #7e22ce)'
              : 'rgba(255,255,255,0.05)',
            color: activeTab === t.id ? '#fff' : '#9ca3af',
            border: activeTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: activeTab === t.id ? '0 4px 15px rgba(168,85,247,0.4)' : 'none',
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Astrologer Grid */}
      <div className="horoscope-responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {astrologers.map(a => (
          <div key={a.id} style={{
            borderRadius: '20px', overflow: 'hidden',
            background: 'rgba(20,20,28,0.6)', backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(168,85,247,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Card Top */}
            <div style={{ padding: '24px 24px 16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={a.img} alt={a.name} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(168,85,247,0.4)' }} />
                <div style={{
                  position: 'absolute', bottom: 2, right: 2, width: '12px', height: '12px',
                  borderRadius: '50%', background: statusColor[a.status], border: '2px solid #0a0a0c',
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#fff', margin: 0 }}>{a.name}</h3>
                  <span style={{ fontSize: '11px', color: statusColor[a.status], fontWeight: 600 }}>{statusLabel[a.status]}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#a855f7', marginTop: '2px', marginBottom: '4px' }}>{a.skill}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{a.languages}</p>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '12px', padding: '0 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {[
                { icon: <Star size={12} fill="#fbbf24" color="#fbbf24" />, val: a.rating },
                { icon: <Clock size={12} color="#9ca3af" />, val: a.exp },
                { icon: <Zap size={12} color="#a855f7" />, val: `₹${a.price}/min` },
              ].map(({ icon, val }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#d1d5db' }}>
                  {icon} {val}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ padding: '16px 24px', display: 'flex', gap: '8px' }}>
              <button
                disabled={a.status === 'offline'}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: '10px',
                  background: a.status !== 'offline' ? 'linear-gradient(135deg, #a855f7, #7e22ce)' : 'rgba(255,255,255,0.05)',
                  color: a.status !== 'offline' ? '#fff' : '#4b5563',
                  border: 'none', fontWeight: 600, fontSize: '13px', cursor: a.status !== 'offline' ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'filter 0.2s',
                }}
                onMouseEnter={e => { if (a.status !== 'offline') e.currentTarget.style.filter = 'brightness(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; }}
              >
                {activeTab === 'chat' && <><MessageCircle size={14} /> Chat Now</>}
                {activeTab === 'call' && <><Phone size={14} /> Call Now</>}
                {activeTab === 'video' && <><Video size={14} /> Video Call</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
