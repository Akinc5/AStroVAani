import { useState } from 'react';
import { Hash, Heart, Star, Shuffle } from 'lucide-react';

// ─── Numerology Calculator ────────────────────────────────────────────────────
function getNumerologyResult(name, dob) {
  // Life Path Number from date of birth
  const digits = dob.replace(/\D/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').reduce((a, b) => a + Number(b), 0);
  }

  // Expression number from name
  const map = { a:1,b:2,c:3,d:4,e:5,f:8,g:3,h:5,i:1,j:1,k:2,l:3,m:4,n:5,o:7,p:8,q:1,r:2,s:3,t:4,u:6,v:6,w:6,x:5,y:1,z:7 };
  let expSum = name.toLowerCase().replace(/[^a-z]/g, '').split('').reduce((a, c) => a + (map[c] || 0), 0);
  while (expSum > 9 && expSum !== 11 && expSum !== 22) {
    expSum = String(expSum).split('').reduce((a, b) => a + Number(b), 0);
  }

  const meanings = {
    1: { title: 'The Leader', desc: 'You are independent, pioneering, and a natural born leader. Your ambition drives you forward.', color: '#f43f5e' },
    2: { title: 'The Diplomat', desc: 'You are cooperative, harmonious, and excellent at partnerships. Sensitivity is your strength.', color: '#38bdf8' },
    3: { title: 'The Creator', desc: 'You are expressive, creative, and joyful. Communication and artistic talents flow through you.', color: '#fbbf24' },
    4: { title: 'The Builder', desc: 'You are practical, reliable, and disciplined. You build solid foundations in everything you do.', color: '#34d399' },
    5: { title: 'The Adventurer', desc: 'You are freedom-loving, versatile, and curious. Change and new experiences fuel you.', color: '#a855f7' },
    6: { title: 'The Nurturer', desc: 'You are compassionate, responsible, and family-oriented. Love and harmony guide your path.', color: '#ec4899' },
    7: { title: 'The Seeker', desc: 'You are analytical, spiritual, and truth-seeking. Depth of wisdom is your greatest gift.', color: '#6366f1' },
    8: { title: 'The Powerhouse', desc: 'You are ambitious, authoritative, and materially successful. Power and achievement define you.', color: '#f59e0b' },
    9: { title: 'The Humanitarian', desc: 'You are compassionate, idealistic, and globally conscious. You are here to serve a higher purpose.', color: '#10b981' },
    11: { title: 'The Illuminator', desc: 'Master Number 11 — You are an intuitive visionary with a powerful spiritual calling.', color: '#e879f9' },
    22: { title: 'The Master Builder', desc: 'Master Number 22 — You have the potential to manifest extraordinary dreams into reality.', color: '#fb923c' },
    33: { title: 'The Master Teacher', desc: 'Master Number 33 — Rare, compassionate, and divinely guided. You are here to uplift humanity.', color: '#f0abfc' },
  };

  return { lifePath: sum, expression: expSum, meaning: meanings[sum] || meanings[1] };
}

// ─── Love Compatibility ────────────────────────────────────────────────────────
const compatibilityData = {
  Aries:       { Aries:65, Taurus:55, Gemini:80, Cancer:45, Leo:90, Virgo:50, Libra:60, Scorpio:70, Sagittarius:85, Capricorn:40, Aquarius:70, Pisces:55 },
  Taurus:      { Aries:55, Taurus:80, Gemini:50, Cancer:85, Leo:60, Virgo:90, Libra:65, Scorpio:75, Sagittarius:45, Capricorn:88, Aquarius:40, Pisces:78 },
  Gemini:      { Aries:80, Taurus:50, Gemini:70, Cancer:55, Leo:75, Virgo:60, Libra:88, Scorpio:45, Sagittarius:80, Capricorn:50, Aquarius:85, Pisces:60 },
  Cancer:      { Aries:45, Taurus:85, Gemini:55, Cancer:75, Leo:50, Virgo:78, Libra:55, Scorpio:90, Sagittarius:40, Capricorn:75, Aquarius:45, Pisces:88 },
  Leo:         { Aries:90, Taurus:60, Gemini:75, Cancer:50, Leo:70, Virgo:55, Libra:80, Scorpio:55, Sagittarius:88, Capricorn:50, Aquarius:65, Pisces:60 },
  Virgo:       { Aries:50, Taurus:90, Gemini:60, Cancer:78, Leo:55, Virgo:68, Libra:58, Scorpio:80, Sagittarius:48, Capricorn:85, Aquarius:55, Pisces:72 },
  Libra:       { Aries:60, Taurus:65, Gemini:88, Cancer:55, Leo:80, Virgo:58, Libra:72, Scorpio:60, Sagittarius:78, Capricorn:60, Aquarius:82, Pisces:65 },
  Scorpio:     { Aries:70, Taurus:75, Gemini:45, Cancer:90, Leo:55, Virgo:80, Libra:60, Scorpio:78, Sagittarius:50, Capricorn:80, Aquarius:50, Pisces:88 },
  Sagittarius: { Aries:85, Taurus:45, Gemini:80, Cancer:40, Leo:88, Virgo:48, Libra:78, Scorpio:50, Sagittarius:72, Capricorn:52, Aquarius:80, Pisces:60 },
  Capricorn:   { Aries:40, Taurus:88, Gemini:50, Cancer:75, Leo:50, Virgo:85, Libra:60, Scorpio:80, Sagittarius:52, Capricorn:78, Aquarius:60, Pisces:75 },
  Aquarius:    { Aries:70, Taurus:40, Gemini:85, Cancer:45, Leo:65, Virgo:55, Libra:82, Scorpio:50, Sagittarius:80, Capricorn:60, Aquarius:74, Pisces:65 },
  Pisces:      { Aries:55, Taurus:78, Gemini:60, Cancer:88, Leo:60, Virgo:72, Libra:65, Scorpio:88, Sagittarius:60, Capricorn:75, Aquarius:65, Pisces:80 },
};
const signs = Object.keys(compatibilityData);

// ─── Lucky Number ──────────────────────────────────────────────────────────────
function getLuckyInfo(dob) {
  if (!dob) return null;
  const d = new Date(dob);
  const daySum = d.getDate() + (d.getMonth() + 1) + d.getFullYear();
  let lucky = daySum;
  while (lucky > 9) lucky = String(lucky).split('').reduce((a, b) => a + Number(b), 0);
  const colors = ['#f43f5e','#38bdf8','#fbbf24','#34d399','#a855f7','#ec4899','#6366f1','#f59e0b','#10b981'];
  const stones = ['Ruby','Moonstone','Yellow Sapphire','Emerald','Amethyst','Diamond','Cat\'s Eye','Blue Sapphire','Pearl'];
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return { number: lucky, color: colors[lucky - 1], stone: stones[lucky - 1], luckyDay: days[lucky % 7] };
}

const tabs = [
  { id: 'numerology', label: 'Numerology', icon: <Hash size={15} /> },
  { id: 'love', label: 'Love Compatibility', icon: <Heart size={15} /> },
  { id: 'lucky', label: 'Lucky Number', icon: <Star size={15} /> },
];

export default function Calculators() {
  const [tab, setTab] = useState('numerology');

  // Numerology state
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [numResult, setNumResult] = useState(null);

  // Love state
  const [sign1, setSign1] = useState('Aries');
  const [sign2, setSign2] = useState('Scorpio');

  // Lucky state
  const [luckyDob, setLuckyDob] = useState('');
  const [luckyResult, setLuckyResult] = useState(null);

  const compat = compatibilityData[sign1]?.[sign2] ?? 50;
  const compatColor = compat >= 80 ? '#22c55e' : compat >= 60 ? '#fbbf24' : '#f43f5e';
  const compatLabel = compat >= 80 ? 'Highly Compatible ❤️' : compat >= 60 ? 'Moderately Compatible 💛' : 'Challenging Match 🔥';

  const inputStyle = {
    width: '100%', padding: '13px 18px', borderRadius: '12px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px 80px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, marginBottom: '8px',
        background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Astrology Calculators</h1>
      <p style={{ color: '#9ca3af', marginBottom: '32px' }}>Unlock hidden insights through numbers, stars, and cosmic patterns.</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '36px', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '10px 20px', borderRadius: '999px', fontWeight: 600, fontSize: '13px',
            cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'inherit',
            background: tab === t.id ? 'linear-gradient(135deg, #38bdf8, #6366f1)' : 'rgba(255,255,255,0.05)',
            color: tab === t.id ? '#fff' : '#9ca3af',
            border: tab === t.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: tab === t.id ? '0 4px 15px rgba(56,189,248,0.3)' : 'none',
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Numerology */}
      {tab === 'numerology' && (
        <div style={{ background: 'rgba(20,20,28,0.6)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px' }}>
          <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '24px', fontSize: '20px' }}>Numerology Calculator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>FULL NAME</label>
              <input style={inputStyle} placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>DATE OF BIRTH</label>
              <input style={{ ...inputStyle, colorScheme: 'dark' }} type="date" value={dob} onChange={e => setDob(e.target.value)} />
            </div>
            <button
              onClick={() => { if (name && dob) setNumResult(getNumerologyResult(name, dob)); }}
              style={{
                padding: '13px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #a855f7, #7e22ce)', color: '#fff',
                fontWeight: 700, fontSize: '15px', fontFamily: 'inherit', marginTop: '4px',
                transition: 'filter 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; }}
            >
              Calculate My Numbers
            </button>
          </div>

          {numResult && (
            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Life Path */}
              <div style={{
                padding: '24px', borderRadius: '16px',
                background: `linear-gradient(135deg, ${numResult.meaning.color}18, transparent)`,
                border: `1px solid ${numResult.meaning.color}35`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 900,
                    background: `${numResult.meaning.color}22`, color: numResult.meaning.color,
                    border: `2px solid ${numResult.meaning.color}40`,
                  }}>
                    {numResult.lifePath}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '3px' }}>LIFE PATH NUMBER</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>{numResult.meaning.title}</div>
                  </div>
                </div>
                <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: 1.6, marginTop: '14px' }}>{numResult.meaning.desc}</p>
              </div>
              {/* Expression */}
              <div style={{ padding: '18px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#fbbf24', width: '40px', textAlign: 'center' }}>{numResult.expression}</div>
                <div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>EXPRESSION NUMBER</div>
                  <div style={{ fontSize: '14px', color: '#fff', marginTop: '2px' }}>How the world sees your potential</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Love Compatibility */}
      {tab === 'love' && (
        <div style={{ background: 'rgba(20,20,28,0.6)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px' }}>
          <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '24px', fontSize: '20px' }}>Love Compatibility</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>YOUR SIGN</label>
              <select value={sign1} onChange={e => setSign1(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                {signs.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ fontSize: '24px', textAlign: 'center', paddingTop: '22px' }}>❤️</div>
            <div>
              <label style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>PARTNER'S SIGN</label>
              <select value={sign2} onChange={e => setSign2(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                {signs.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Result always shown */}
          <div style={{ marginTop: '28px', padding: '28px', borderRadius: '18px', background: `${compatColor}12`, border: `1px solid ${compatColor}35`, textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>{sign1} + {sign2}</div>
            <div style={{ fontSize: '72px', fontWeight: 900, color: compatColor, lineHeight: 1 }}>{compat}<span style={{ fontSize: '32px' }}>%</span></div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginTop: '10px' }}>{compatLabel}</div>
            <div style={{ marginTop: '16px', height: '8px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${compat}%`, background: `linear-gradient(90deg, ${compatColor}, ${compatColor}88)`, borderRadius: '999px', transition: 'width 0.6s ease' }} />
            </div>
          </div>
        </div>
      )}

      {/* Lucky Number */}
      {tab === 'lucky' && (
        <div style={{ background: 'rgba(20,20,28,0.6)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px' }}>
          <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '24px', fontSize: '20px' }}>Lucky Number Calculator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>DATE OF BIRTH</label>
              <input style={{ ...inputStyle, colorScheme: 'dark' }} type="date" value={luckyDob} onChange={e => setLuckyDob(e.target.value)} />
            </div>
            <button
              onClick={() => { if (luckyDob) setLuckyResult(getLuckyInfo(luckyDob)); }}
              style={{
                padding: '13px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1a1a1a',
                fontWeight: 700, fontSize: '15px', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'filter 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; }}
            >
              <Shuffle size={16} /> Reveal My Lucky Info
            </button>
          </div>

          {luckyResult && (
            <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {[
                { label: 'Lucky Number', value: luckyResult.number, bg: '#a855f7' },
                { label: 'Lucky Day', value: luckyResult.luckyDay, bg: '#38bdf8' },
                { label: 'Lucky Stone', value: luckyResult.stone, bg: '#34d399' },
                { label: 'Lucky Color', value: <div style={{ display:'flex', alignItems:'center', gap:'8px' }}><div style={{ width:'20px', height:'20px', borderRadius:'50%', background: luckyResult.color, border:'2px solid rgba(255,255,255,0.2)' }} /> {luckyResult.color}</div>, bg: '#ec4899' },
              ].map(({ label, value, bg }) => (
                <div key={label} style={{
                  padding: '18px', borderRadius: '14px',
                  background: `${bg}12`, border: `1px solid ${bg}30`, textAlign: 'center',
                }}>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '6px' }}>{label}</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', display: 'flex', justifyContent: 'center' }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
