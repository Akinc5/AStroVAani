import { useState } from 'react';
import { Clock, User, Tag } from 'lucide-react';

const articles = [
  {
    id: 1, category: 'Vedic Astrology', title: 'Saturn Return: Why Your Late 20s Feel Like Chaos',
    excerpt: 'Saturn takes 29.5 years to orbit the sun. When it returns to where it was when you were born, life shakes itself to the core. Here\'s how to navigate it.',
    author: 'Pandit Suresh', readTime: '6 min', date: 'Aug 12, 2026', color: '#a855f7', emoji: '🪐',
  },
  {
    id: 2, category: 'Tarot', title: 'The Tower Card: Destruction as Divine Intervention',
    excerpt: 'Most people fear pulling The Tower. But what if this radical upheaval is exactly what the universe ordered for your evolution?',
    author: 'Tarot Priya', readTime: '4 min', date: 'Aug 11, 2026', color: '#f43f5e', emoji: '🏰',
  },
  {
    id: 3, category: 'Numerology', title: '2026: A Universal Year 1 — The Decade\'s Fresh Start',
    excerpt: 'Every year carries a universal vibration. 2026 reduces to 1 — the number of beginnings, independence, and bold new chapters. Here\'s what that means for you.',
    author: 'Astro Neha', readTime: '5 min', date: 'Aug 10, 2026', color: '#fbbf24', emoji: '🔢',
  },
  {
    id: 4, category: 'Relationships', title: 'Venus Retrograde and Love: What to Expect',
    excerpt: 'When Venus goes retrograde, exes resurface, love slows down, and karmic lessons emerge. Use this period wisely to reflect rather than restart.',
    author: 'Astro Kavita', readTime: '7 min', date: 'Aug 9, 2026', color: '#ec4899', emoji: '♀️',
  },
  {
    id: 5, category: 'Vedic Astrology', title: 'Rahu-Ketu Axis 2026-2027: Transformation for Every Sign',
    excerpt: 'The nodes of the Moon shift signs roughly every 18 months. Their move into Aquarius and Leo will rewrite the script for collective evolution.',
    author: 'Vastu Amit', readTime: '8 min', date: 'Aug 8, 2026', color: '#38bdf8', emoji: '☊',
  },
  {
    id: 6, category: 'Wellness', title: 'Ayurveda Meets Astrology: Your Dosha by Zodiac Sign',
    excerpt: 'Your birth chart doesn\'t just reveal your personality — it can also illuminate your constitutional type (dosha) and the lifestyle best suited for your wellbeing.',
    author: 'Astro Rahul', readTime: '5 min', date: 'Aug 7, 2026', color: '#34d399', emoji: '🌿',
  },
];

const categories = ['All', 'Vedic Astrology', 'Tarot', 'Numerology', 'Relationships', 'Wellness'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, marginBottom: '8px',
        background: 'linear-gradient(90deg, #818cf8, #a855f7)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Cosmic Insights Blog</h1>
      <p style={{ color: '#9ca3af', marginBottom: '32px', fontSize: '15px' }}>
        Deep-dives into astrology, tarot, numerology, and cosmic wisdom.
      </p>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '36px', flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} style={{
            padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            background: activeCategory === c ? 'linear-gradient(135deg, #818cf8, #a855f7)' : 'rgba(255,255,255,0.05)',
            color: activeCategory === c ? '#fff' : '#9ca3af',
            border: activeCategory === c ? 'none' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: activeCategory === c ? '0 4px 15px rgba(129,140,248,0.3)' : 'none',
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Featured Article (first one) */}
      {filtered.length > 0 && activeCategory === 'All' && (
        <div style={{
          borderRadius: '24px', overflow: 'hidden', marginBottom: '24px', cursor: 'pointer',
          background: `linear-gradient(135deg, ${filtered[0].color}18, rgba(20,20,28,0.9))`,
          border: `1px solid ${filtered[0].color}30`, padding: '36px',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${filtered[0].color}20`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
              background: filtered[0].color, color: '#fff',
            }}>FEATURED</span>
            <span style={{
              padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
              background: `${filtered[0].color}20`, color: filtered[0].color,
            }}>{filtered[0].category}</span>
          </div>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>{filtered[0].emoji}</div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>{filtered[0].title}</h2>
          <p style={{ color: '#d1d5db', lineHeight: 1.7, marginBottom: '20px', maxWidth: '700px' }}>{filtered[0].excerpt}</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { icon: <User size={13} />, val: filtered[0].author },
              { icon: <Clock size={13} />, val: filtered[0].readTime + ' read' },
              { icon: <Tag size={13} />, val: filtered[0].date },
            ].map(({ icon, val }) => (
              <span key={val} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#9ca3af' }}>
                {icon} {val}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
        {(activeCategory === 'All' ? filtered.slice(1) : filtered).map(a => (
          <div key={a.id} style={{
            borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
            background: 'rgba(20,20,28,0.6)', backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${a.color}20`; e.currentTarget.style.borderColor = `${a.color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
          >
            {/* Top banner */}
            <div style={{
              height: '100px', background: `${a.color}15`, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '48px', borderBottom: `1px solid ${a.color}20`,
            }}>
              {a.emoji}
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: '999px',
                background: `${a.color}20`, color: a.color, fontSize: '11px', fontWeight: 700, marginBottom: '10px',
              }}>{a.category}</div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', lineHeight: 1.4 }}>{a.title}</h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '16px',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>{a.excerpt}</p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { icon: <User size={11} />, val: a.author },
                  { icon: <Clock size={11} />, val: a.readTime },
                ].map(({ icon, val }) => (
                  <span key={val} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6b7280' }}>
                    {icon} {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
