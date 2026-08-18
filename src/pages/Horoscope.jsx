import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { zodiacSigns, horoscopeData } from '../data/horoscopeData';

const horoscopeTabs = [
  { id: 'today', label: 'Daily' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

// Fake content variants for each tab type
const tabContent = {
  today: (sign) => horoscopeData[sign.id]?.today?.general || '',
  tomorrow: (sign) => `Tomorrow brings renewed energy for ${sign.name}. Take time to plan ahead and trust your intuition. Unexpected opportunities may arise — stay open to change.`,
  yesterday: (sign) => `Yesterday's cosmic energy for ${sign.name} encouraged reflection. The day was marked by subtle insights and meaningful connections that continue to resonate.`,
  weekly: (sign) => `This week, ${sign.name} enters a period of growth and expansion. Mid-week brings a burst of creative inspiration, while the weekend calls for rest and inner reflection.`,
  monthly: (sign) => `${sign.name}, this month is a powerful time for manifesting your deepest intentions. Career gains are highlighted around the 10th, while relationships deepen toward the month's end.`,
  yearly: (sign) => `2026 is a transformative year for ${sign.name}. Jupiter's influence brings abundance and wisdom. Expect major breakthroughs in career and personal growth in Q2 and Q3.`,
};

export default function Horoscope() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredSign, setHoveredSign] = useState(null);
  const [selectedSign, setSelectedSign] = useState(null);

  const activeTab = searchParams.get('type') || 'today';
  const setActiveTab = (tabId) => setSearchParams({ type: tabId });

  return (
    <div className="animate-fade-in" style={{
      width: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', paddingBottom: '80px',
    }}>
      {/* Heading */}
      <h1 style={{
        fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-0.5px',
        marginBottom: '16px', marginTop: '40px', textAlign: 'center',
        background: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {horoscopeTabs.find(t => t.id === activeTab)?.label || 'Daily'} Horoscope
      </h1>

      {/* Sub-type Tabs */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '36px', flexWrap: 'wrap',
        justifyContent: 'center', padding: '0 16px',
      }}>
        {horoscopeTabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s',
            background: activeTab === t.id
              ? 'linear-gradient(135deg, #ff9a9e, #fecfef)'
              : 'rgba(255,255,255,0.05)',
            color: activeTab === t.id ? '#1a1a1a' : '#9ca3af',
            border: activeTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: activeTab === t.id ? '0 4px 15px rgba(255,154,158,0.3)' : 'none',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Zodiac Navigation */}
      <div style={{
        width: '100%', maxWidth: '1100px', padding: '0 16px', marginBottom: '40px',
        overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: '8px',
          minWidth: 'max-content', paddingBottom: '8px', width: '100%',
        }}>
          {zodiacSigns.map((sign) => {
            const isSelected = selectedSign === sign.id;
            return (
              <button
                key={`nav-${sign.id}`}
                onClick={() => setSelectedSign(prev => prev === sign.id ? null : sign.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  width: '60px', flexShrink: 0, background: 'transparent', border: 'none',
                  cursor: 'pointer', opacity: isSelected ? 1 : 0.65,
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.opacity = '0.65'; e.currentTarget.style.transform = 'scale(1)'; } }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', color: 'white',
                  background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                  boxShadow: isSelected ? '0 0 20px rgba(168,85,247,0.8)' : '0 4px 15px rgba(168,85,247,0.4)',
                  border: isSelected ? '2px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.25s ease',
                }}>
                  {sign.icon}
                </div>
                <span style={{
                  fontSize: '10px', textTransform: 'uppercase', fontWeight: '600',
                  letterSpacing: '0.05em', color: isSelected ? '#fff' : '#9ca3af',
                  transition: 'color 0.25s ease',
                }}>{sign.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horoscope Card Grid */}
      <div style={{ width: '100%', maxWidth: '1100px', padding: '0 16px' }}>
        <div className="horoscope-responsive-grid">
          {zodiacSigns.filter(sign => selectedSign ? sign.id === selectedSign : true).map((sign) => {
            const isHovered = hoveredSign === sign.id;
            return (
              <div
                key={`card-${sign.id}`}
                onMouseEnter={() => setHoveredSign(sign.id)}
                onMouseLeave={() => setHoveredSign(null)}
                style={{
                  position: 'relative', padding: '18px', display: 'flex', flexDirection: 'column',
                  cursor: 'pointer', overflow: 'hidden', height: '180px', borderRadius: '16px',
                  background: 'rgba(20,20,25,0.5)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: isHovered ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.5)' : '0 8px 30px rgba(0,0,0,0.3)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                  background: `radial-gradient(circle at top left, ${sign.color}35, transparent 70%)`,
                  opacity: isHovered ? 1 : 0.5, transition: 'opacity 0.3s ease',
                }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ height: '3px', width: '35px', borderRadius: '999px', marginBottom: '10px', background: sign.color }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                      background: 'linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)',
                    }}>{sign.icon}</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', lineHeight: '1.2', margin: 0 }}>{sign.name}</h3>
                      <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{sign.date}</span>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '12px', color: '#d1d5db', lineHeight: '1.5', margin: 0,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {tabContent[activeTab](sign)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
