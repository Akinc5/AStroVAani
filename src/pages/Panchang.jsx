import { useMemo } from 'react';
import { Sun, Moon, Sunrise, Sunset, Clock } from 'lucide-react';

function getPanchang() {
  const now = new Date();

  // Tithi calculation (approx): lunar day based on moon phase approximation
  const lunarCycle = 29.53058867;
  const ref = new Date('2000-01-06T18:14:00Z'); // known new moon
  const diff = (now - ref) / (1000 * 60 * 60 * 24);
  const phase = ((diff % lunarCycle) + lunarCycle) % lunarCycle;
  const tithiIndex = Math.floor((phase / lunarCycle) * 30) % 30;

  const tithis = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya',
  ];
  const paksha = tithiIndex < 15 ? 'Shukla Paksha' : 'Krishna Paksha';

  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati',
  ];
  const nakshatra = nakshatras[Math.floor((diff * 27 / lunarCycle) % 27)];

  const yogas = ['Vishkambha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarman','Dhriti','Shoola','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyan','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'];
  const yoga = yogas[Math.floor((diff * 27 / lunarCycle * 2) % 27)];

  const karanas = ['Bava','Balava','Kaulava','Taitila','Garaja','Vanija','Vishti','Shakuni','Chatushpada','Nagava','Kimstughna'];
  const karana = karanas[tithiIndex % 11];

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const vara = days[now.getDay()];

  // Sunrise/Sunset approx for India (IST = UTC+5:30)
  const sunrise = '06:12 AM';
  const sunset = '07:18 PM';

  // Rahukaal: different each day of week (for India)
  const rahukaals = {
    Sunday: '04:30 PM – 06:00 PM', Monday: '07:30 AM – 09:00 AM',
    Tuesday: '03:00 PM – 04:30 PM', Wednesday: '12:00 PM – 01:30 PM',
    Thursday: '01:30 PM – 03:00 PM', Friday: '10:30 AM – 12:00 PM',
    Saturday: '09:00 AM – 10:30 AM',
  };
  const brahmaMuhurta = '04:40 AM – 05:28 AM';

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const date = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  return { tithi: tithis[tithiIndex], paksha, nakshatra, yoga, karana, vara, sunrise, sunset, rahukaal: rahukaals[vara], brahmaMuhurta, date };
}

const sections = (p) => [
  { label: 'Tithi', value: `${p.tithi} (${p.paksha})`, color: '#a855f7', icon: '🌙' },
  { label: 'Nakshatra', value: p.nakshatra, color: '#38bdf8', icon: '⭐' },
  { label: 'Yoga', value: p.yoga, color: '#34d399', icon: '🔯' },
  { label: 'Karana', value: p.karana, color: '#fbbf24', icon: '🌿' },
  { label: 'Vara (Day)', value: p.vara, color: '#ec4899', icon: '📅' },
  { label: 'Brahma Muhurta', value: p.brahmaMuhurta, color: '#f97316', icon: '🕌', desc: 'Most auspicious morning time' },
  { label: 'Rahu Kaal', value: p.rahukaal, color: '#f43f5e', icon: '⚠️', desc: 'Avoid important work during this time' },
];

export default function Panchang() {
  const p = useMemo(() => getPanchang(), []);

  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px 80px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, marginBottom: '4px',
        background: 'linear-gradient(90deg, #fbbf24, #f97316)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>आज का पंचांग</h1>
      <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>Today's Panchang</h2>
      <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '36px' }}>{p.date}</p>

      {/* Sunrise / Sunset banner */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px',
      }}>
        {[
          { icon: <Sunrise size={28} color="#fbbf24" />, label: 'Sunrise', value: p.sunrise, color: '#fbbf24' },
          { icon: <Sunset size={28} color="#f97316" />, label: 'Sunset', value: p.sunset, color: '#f97316' },
        ].map(({ icon, label, value, color }) => (
          <div key={label} style={{
            padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px',
            background: `${color}12`, border: `1px solid ${color}30`,
          }}>
            {icon}
            <div>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Panchang Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
        {sections(p).map(({ label, value, color, icon, desc }) => (
          <div key={label} style={{
            padding: '22px', borderRadius: '18px',
            background: `${color}10`, border: `1px solid ${color}28`,
            transition: 'transform 0.25s, box-shadow 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${color}20`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
            <div style={{ fontSize: '11px', color, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>{value}</div>
            {desc && <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>{desc}</div>}
          </div>
        ))}
      </div>

      {/* Note */}
      <div style={{
        marginTop: '28px', padding: '16px 20px', borderRadius: '14px',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        fontSize: '12px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'flex-start',
      }}>
        <Clock size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
        <span>Panchang data is approximately calculated for the current date. For exact values specific to your city, consult a local almanac or astrologer.</span>
      </div>
    </div>
  );
}
