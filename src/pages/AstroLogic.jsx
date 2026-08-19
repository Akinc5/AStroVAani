import { useState, useMemo } from 'react';
import { ChevronDown, Code2, FlaskConical, Sigma, Calculator, Star, Moon, Sun, Zap } from 'lucide-react';

// ─── Color palette ───────────────────────────────────────────────────────────
const C = {
  gold:    '#fbbf24',
  orange:  '#f97316',
  purple:  '#a855f7',
  indigo:  '#818cf8',
  cyan:    '#38bdf8',
  green:   '#34d399',
  pink:    '#ec4899',
  red:     '#f43f5e',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function CodeBlock({ code }) {
  const lines = code.trim().split('\n');
  return (
    <div style={{
      background: 'rgba(0,0,0,0.6)', borderRadius: '14px',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '20px 24px', overflowX: 'auto',
      fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
      fontSize: '13px', lineHeight: 1.8,
    }}>
      {lines.map((line, i) => {
        // Very simple syntax coloring
        let colored = line
          .replace(/(\/\/.*$)/gm, '<span style="color:#6b7280">$1</span>')
          .replace(/\b(const|let|const|function|return|new|while|Math|Date|String|Number)\b/g, '<span style="color:#38bdf8">$1</span>')
          .replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span style="color:#fbbf24">$1</span>')
          .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#34d399">$1</span>');
        return (
          <div key={i} style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#374151', userSelect: 'none', minWidth: '20px', textAlign: 'right' }}>{i + 1}</span>
            <span style={{ color: '#d1d5db' }} dangerouslySetInnerHTML={{ __html: colored }} />
          </div>
        );
      })}
    </div>
  );
}

function FormulaBox({ formula, color }) {
  return (
    <div style={{
      padding: '16px 20px', borderRadius: '12px',
      background: `${color}12`, border: `1px solid ${color}30`,
      fontFamily: "'Fira Code', 'Consolas', monospace",
      fontSize: '14px', color: '#fff', letterSpacing: '0.3px',
      marginBottom: '16px',
    }}>
      <span style={{ color, fontWeight: 700, marginRight: '8px' }}>ƒ</span>
      {formula}
    </div>
  );
}

function SectionCard({ title, emoji, color, icon, children }) {
  const [open, setOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);

  return (
    <div style={{
      borderRadius: '22px', overflow: 'hidden',
      background: `${color}0a`, border: `1px solid ${color}28`,
      transition: 'box-shadow 0.3s, border-color 0.3s',
      ...(open ? { boxShadow: `0 16px 48px ${color}20`, borderColor: `${color}50` } : {}),
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '16px',
          padding: '24px 28px', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
        }}
      >
        <div style={{
          width: '52px', height: '52px', borderRadius: '16px', flexShrink: 0,
          background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', border: `1px solid ${color}30`,
        }}>
          {emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '19px', fontWeight: 800, color: '#fff', marginBottom: '3px' }}>{title}</div>
          <div style={{ fontSize: '12px', color, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Click to explore the math
          </div>
        </div>
        <ChevronDown
          size={20}
          color={color}
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.35s', flexShrink: 0 }}
        />
      </button>

      {/* Body */}
      {open && (
        <div style={{ padding: '0 28px 28px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ height: '1px', background: `${color}20`, marginBottom: '24px' }} />
          {children({ showCode, setShowCode })}
        </div>
      )}
    </div>
  );
}

function Tag({ text, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '4px 12px', borderRadius: '999px',
      background: `${color}18`, color, fontSize: '12px', fontWeight: 700,
      border: `1px solid ${color}28`,
    }}>
      {text}
    </span>
  );
}

function StepTrace({ steps, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            background: `${color}22`, border: `2px solid ${color}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 800, color,
          }}>
            {i + 1}
          </div>
          <div style={{ paddingTop: '4px', flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '2px' }}>{step.label}</div>
            <div style={{
              fontFamily: "'Fira Code', monospace", fontSize: '13px',
              color: '#fff', background: 'rgba(0,0,0,0.4)',
              padding: '6px 12px', borderRadius: '8px', display: 'inline-block',
              border: `1px solid ${color}20`,
            }}>
              {step.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Live Tithi Trace ─────────────────────────────────────────────────────────
function LiveTithiTrace() {
  const trace = useMemo(() => {
    const now = new Date();
    const lunarCycle = 29.53058867;
    const ref = new Date('2000-01-06T18:14:00Z');
    const msElapsed = now - ref;
    const daysElapsed = msElapsed / (1000 * 60 * 60 * 24);
    const phase = ((daysElapsed % lunarCycle) + lunarCycle) % lunarCycle;
    const tithiRaw = (phase / lunarCycle) * 30;
    const tithiIndex = Math.floor(tithiRaw) % 30;
    const tithis = [
      'Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami',
      'Shashthi','Saptami','Ashtami','Navami','Dashami',
      'Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima',
      'Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami',
      'Shashthi','Saptami','Ashtami','Navami','Dashami',
      'Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Amavasya',
    ];
    const paksha = tithiIndex < 15 ? 'Shukla Paksha (Waxing Moon)' : 'Krishna Paksha (Waning Moon)';

    return [
      { label: 'Today\'s date & time', value: now.toUTCString() },
      { label: 'Reference new moon (Jan 6, 2000 at 18:14 UTC)', value: ref.toUTCString() },
      { label: 'Milliseconds elapsed since reference', value: `${msElapsed.toFixed(0)} ms` },
      { label: 'Convert to days elapsed', value: `${daysElapsed.toFixed(6)} days` },
      { label: 'Lunar cycle length', value: `${lunarCycle} days` },
      { label: 'Phase = (days % lunarCycle + lunarCycle) % lunarCycle', value: `${phase.toFixed(6)} days` },
      { label: 'Tithi position = (phase / lunarCycle) × 30', value: `${tithiRaw.toFixed(4)}` },
      { label: 'Tithi index = Math.floor(position) % 30', value: `${tithiIndex}` },
      { label: 'Paksha (lunar fortnight)', value: paksha },
      { label: '🎯 Final Result — Today\'s Tithi', value: tithis[tithiIndex] },
    ];
  }, []);

  return (
    <div>
      <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
        Watch how today's Tithi is derived from the current UTC timestamp, step by step:
      </div>
      <StepTrace steps={trace} color={C.purple} />
    </div>
  );
}

// ─── Live Nakshatra Trace ─────────────────────────────────────────────────────
function LiveNakshatraTrace() {
  const trace = useMemo(() => {
    const now = new Date();
    const lunarCycle = 29.53058867;
    const ref = new Date('2000-01-06T18:14:00Z');
    const daysElapsed = (now - ref) / (1000 * 60 * 60 * 24);
    const nakshatraRaw = (daysElapsed * 27 / lunarCycle) % 27;
    const nakshatraIndex = Math.floor(((nakshatraRaw % 27) + 27) % 27);
    const nakshatras = [
      'Ashwini','Bharani','Krittika','Rohini','Mrigashira',
      'Ardra','Punarvasu','Pushya','Ashlesha','Magha',
      'Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati',
      'Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha',
      'Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada',
      'Uttara Bhadrapada','Revati',
    ];

    return [
      { label: 'Days elapsed since reference new moon', value: `${daysElapsed.toFixed(4)} days` },
      { label: 'Moon moves through 27 nakshatras per lunar cycle', value: '27 nakshatras / 29.53 days' },
      { label: 'Raw nakshatra position = days × 27 / lunarCycle', value: `${nakshatraRaw.toFixed(6)}` },
      { label: 'Nakshatra index = Math.floor(position % 27)', value: `${nakshatraIndex}` },
      { label: '🎯 Final Result — Today\'s Nakshatra', value: nakshatras[nakshatraIndex] },
    ];
  }, []);

  return <StepTrace steps={trace} color={C.cyan} />;
}

// ─── Live Numerology Trace ────────────────────────────────────────────────────
function LiveNumerologyTrace() {
  const [dob, setDob] = useState('');
  const trace = useMemo(() => {
    if (!dob) return null;
    const digits = dob.replace(/\D/g, '').split('').map(Number);
    const steps = [{ label: 'Input date of birth', value: dob }];
    steps.push({ label: 'Extract all digits', value: `[${digits.join(', ')}]` });
    let sum = digits.reduce((a, b) => a + b, 0);
    steps.push({ label: `Sum all digits: ${digits.join(' + ')}`, value: `= ${sum}` });
    let iteration = 1;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      const prev = sum;
      const parts = String(sum).split('').map(Number);
      sum = parts.reduce((a, b) => a + b, 0);
      steps.push({ label: `Reduce again (iteration ${iteration}): ${prev} → ${parts.join(' + ')}`, value: `= ${sum}` });
      iteration++;
    }
    const isMaster = [11, 22, 33].includes(sum);
    steps.push({ label: isMaster ? '✨ Master Number — do NOT reduce further!' : '✅ Single digit reached — stop reducing', value: '' });
    steps.push({ label: '🎯 Your Life Path Number', value: String(sum) });
    return steps;
  }, [dob]);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: '#9ca3af', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
          Enter your Date of Birth to trace your Life Path Number:
        </label>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          style={{
            padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.gold}40`,
            background: 'rgba(0,0,0,0.4)', color: '#fff', fontFamily: 'inherit',
            fontSize: '14px', outline: 'none', cursor: 'pointer',
          }}
        />
      </div>
      {trace ? (
        <StepTrace steps={trace.filter(s => s.value !== '')} color={C.gold} />
      ) : (
        <div style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>
          Select a date above to see the calculation unfold live.
        </div>
      )}
    </div>
  );
}

// ─── Concept Data ─────────────────────────────────────────────────────────────
const concepts = [
  {
    id: 'tithi',
    title: 'Tithi — The Lunar Day',
    emoji: '🌙',
    color: C.purple,
    tags: ['Panchang', 'Moon', 'Astronomy'],
    formula: 'tithiIndex = Math.floor(((daysSinceNewMoon % 29.53) / 29.53) × 30) % 30',
    why: `The Moon completes a full cycle in approximately 29.53058867 days (a synodic month). Hindu astronomy divides this cycle into 30 equal parts called Tithis — 15 for the waxing phase (Shukla Paksha) and 15 for the waning phase (Krishna Paksha). By knowing a precise reference new moon (January 6, 2000 at 18:14 UTC) and calculating how many days have elapsed since then, we can locate exactly where in the lunar cycle we are today.`,
    code: `const lunarCycle = 29.53058867;
const ref = new Date('2000-01-06T18:14:00Z'); // known new moon
const now = new Date();
const diff = (now - ref) / (1000 * 60 * 60 * 24);
const phase = ((diff % lunarCycle) + lunarCycle) % lunarCycle;
// Extra +lunarCycle handles negative modulo in JS
const tithiIndex = Math.floor((phase / lunarCycle) * 30) % 30;`,
    liveDemo: <LiveTithiTrace />,
  },
  {
    id: 'nakshatra',
    title: 'Nakshatra — The Lunar Mansion',
    emoji: '⭐',
    color: C.cyan,
    tags: ['Panchang', 'Moon', 'Ecliptic'],
    formula: 'nakshatraIndex = Math.floor((daysSinceRef × 27 / 29.53) % 27)',
    why: `The ecliptic (the apparent path of the Sun across the sky) is divided into 27 equal segments of 13°20′ each. These are the Nakshatras, or lunar mansions. The Moon, during its 29.53-day orbit, traverses all 27 in approximately 27.32 days (a sidereal month). By tracking days elapsed × (27 nakshatras / 29.53 days), we get a continuously increasing position that we wrap to [0,27) to find the current nakshatra.`,
    code: `const diff = (now - ref) / (1000 * 60 * 60 * 24);
// Moon covers 27 nakshatras per lunar cycle
const nakshatraPos = (diff * 27 / lunarCycle) % 27;
const nakshatraIndex = Math.floor(
  ((nakshatraPos % 27) + 27) % 27
);`,
    liveDemo: <LiveNakshatraTrace />,
  },
  {
    id: 'yoga',
    title: 'Yoga — The Sun–Moon Combination',
    emoji: '🔯',
    color: C.green,
    tags: ['Panchang', 'Sun', 'Moon', 'Combined'],
    formula: 'yogaIndex = Math.floor((diff × 27 / lunarCycle × 2) % 27)',
    why: `Yoga is unique — it depends on the combined positions of both the Sun and the Moon. In traditional Vedic astronomy, Yoga is the sum of the Sun's and Moon's longitudes, divided into 27 equal arcs of 13°20′ each. In this approximation, we double the nakshatra rate (×2) to approximate the combined solar-lunar angular velocity, since the Sun contributes its own daily motion to the total. There are 27 Yogas, each with its own auspiciousness rating.`,
    code: `// Yoga ≈ combined Sun+Moon motion through 27 segments
const yogaPos = (diff * 27 / lunarCycle * 2) % 27;
const yogaIndex = Math.floor(((yogaPos % 27) + 27) % 27);
const yoga = yogas[yogaIndex];`,
    liveDemo: null,
  },
  {
    id: 'karana',
    title: 'Karana — Half a Tithi',
    emoji: '🌿',
    color: C.gold,
    tags: ['Panchang', 'Half-Day'],
    formula: 'karanaIndex = tithiIndex % 11   (from 11 repeating Karanas)',
    why: `A Karana is exactly half of a Tithi — so there are 60 Karanas in a lunar month. Of these, 4 are "fixed" (appearing only once) and 7 are "moveable" (repeating 8 times each). The 7 moveable Karanas repeat in a cycle, which is why we use modulo 11 — the 7 moveable ones complete a pattern every 11 half-tithis within the 30-tithi cycle. Each Karana rules approximately 6 hours and influences the quality of activity started during that period.`,
    code: `const karanas = [
  'Bava','Balava','Kaulava','Taitila','Garaja',
  'Vanija','Vishti','Shakuni','Chatushpada','Nagava','Kimstughna'
];
// Cycles every 11 positions through 30 tithis
const karana = karanas[tithiIndex % 11];`,
    liveDemo: null,
  },
  {
    id: 'vara',
    title: 'Vara — The Day of the Week',
    emoji: '📅',
    color: C.pink,
    tags: ['Panchang', 'Weekday', 'Planets'],
    formula: 'vara = ["Sunday","Monday",...,"Saturday"][new Date().getDay()]',
    why: `Vara is simply the day of the week, ruled by a planet. The seven-day week itself comes from Babylonian astronomy and was absorbed into the Vedic system. Each day is governed by a planet: Sun→Sunday, Moon→Monday, Mars→Tuesday (Mangalwar), Mercury→Wednesday (Budhwar), Jupiter→Thursday (Guruwar), Venus→Friday (Shukrawar), Saturn→Saturday (Shaniwar). JavaScript's built-in \`Date.getDay()\` returns 0 (Sunday) through 6 (Saturday), which maps exactly.`,
    code: `const days = [
  'Sunday','Monday','Tuesday','Wednesday',
  'Thursday','Friday','Saturday'
];
const vara = days[new Date().getDay()];
// 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat`,
    liveDemo: null,
  },
  {
    id: 'rahukaal',
    title: 'Rahu Kaal — The Inauspicious Period',
    emoji: '⚠️',
    color: C.red,
    tags: ['Panchang', 'Timing', 'Traditional'],
    formula: 'rahuKaal = lookup[dayOfWeek]  (traditional fixed-slot system)',
    why: `Rahu Kaal is not calculated from astronomical positions — it is a traditional fixed-schedule system. The day (roughly sunrise to sunset, ~12 hours) is divided into 8 equal parts. The Rahu Kaal occupies one of these parts, and which part depends on the day of the week. The order of assignment follows the sequence: Monday=2nd, Saturday=3rd, Friday=4th, Wednesday=5th, Thursday=6th, Tuesday=7th, Sunday=8th slot. For a standard 6:00 AM sunrise and 6:00 PM sunset (12 hours), each slot is 90 minutes.`,
    code: `const rahukaals = {
  Sunday:    '04:30 PM – 06:00 PM', // 8th slot
  Monday:    '07:30 AM – 09:00 AM', // 2nd slot
  Tuesday:   '03:00 PM – 04:30 PM', // 7th slot
  Wednesday: '12:00 PM – 01:30 PM', // 5th slot
  Thursday:  '01:30 PM – 03:00 PM', // 6th slot
  Friday:    '10:30 AM – 12:00 PM', // 4th slot
  Saturday:  '09:00 AM – 10:30 AM', // 3rd slot
};
const rahukaal = rahukaals[vara]; // vara = day name`,
    liveDemo: null,
  },
  {
    id: 'brahmamuhurta',
    title: 'Brahma Muhurta — The Hour of Brahma',
    emoji: '🕌',
    color: C.orange,
    tags: ['Panchang', 'Muhurta', 'Sunrise'],
    formula: 'brahmaMuhurta = (sunrise − 96 minutes) to (sunrise − 48 minutes)',
    why: `Brahma Muhurta translates as "the hour (muhurta) of Brahma (the Creator)." In Vedic time-keeping, a Muhurta is 48 minutes (1/30th of a day). Brahma Muhurta is the 2nd Muhurta before sunrise — meaning it spans from 96 minutes before sunrise to 48 minutes before sunrise. This is considered the most auspicious time for meditation, prayer, and study because the mind is fresh after sleep, the atmosphere is peaceful, and the Sattva (purity) quality of nature is at its peak before the world awakens.`,
    code: `// If sunrise is at 6:12 AM:
// brahmaMuhurta starts at: 6:12 - 96 min = 4:36 AM
// brahmaMuhurta ends at:   6:12 - 48 min = 5:24 AM

function getBrahmaMuhurta(sunriseHour, sunriseMin) {
  const startMin = sunriseHour * 60 + sunriseMin - 96;
  const endMin   = sunriseHour * 60 + sunriseMin - 48;
  const fmt = (m) => {
    const h = Math.floor(m / 60);
    const mm = String(m % 60).padStart(2, '0');
    return \`\${h > 12 ? h - 12 : h}:\${mm} \${h >= 12 ? 'PM' : 'AM'}\`;
  };
  return \`\${fmt(startMin)} – \${fmt(endMin)}\`;
}`,
    liveDemo: null,
  },
  {
    id: 'numerology',
    title: 'Numerology — Life Path Number',
    emoji: '🔢',
    color: C.indigo,
    tags: ['Numerology', 'Pythagorean', 'Date of Birth'],
    formula: 'lifePathNumber = reduceToSingleDigit(sum of all digits in DDMMYYYY)',
    why: `Numerology assigns significance to numbers derived from names and birth dates. The Life Path Number — the most important number — is calculated from the date of birth. All digits in the full date (day, month, year) are summed together. The result is then reduced by summing its digits again, repeatedly, until you reach a single digit (1–9). Exception: 11, 22, and 33 are "Master Numbers" and are never reduced further because they carry extra spiritual significance in numerological tradition.`,
    code: `function getLifePathNumber(dob) {
  // dob = "YYYY-MM-DD" or "DDMMYYYY"
  const digits = dob.replace(/\\D/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);

  // Reduce until single digit, but STOP at master numbers
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum)
      .split('')
      .reduce((a, b) => a + Number(b), 0);
  }
  return sum;
}`,
    liveDemo: <LiveNumerologyTrace />,
  },
];

// ─── Astro Fact Pills ─────────────────────────────────────────────────────────
const facts = [
  { icon: '🌙', text: 'Lunar cycle: 29.53058867 days (synodic month)' },
  { icon: '⭐', text: '27 Nakshatras divide the 360° ecliptic into 13°20′ arcs' },
  { icon: '🔢', text: 'Master Numbers 11, 22, 33 are never reduced further' },
  { icon: '☀️', text: 'Brahma Muhurta = 96–48 min before local sunrise' },
  { icon: '⚠️', text: 'Rahu Kaal = 1/8th of the day, slot varies by weekday' },
  { icon: '📐', text: 'Yoga = Sun longitude + Moon longitude ÷ 13°20′' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AstroLogic() {
  const [activeTab, setActiveTab] = useState('panchang');

  const tabs = [
    { id: 'panchang',     label: 'Panchang',    icon: <Moon size={15} />,       color: C.purple },
    { id: 'numerology',   label: 'Numerology',  icon: <Sigma size={15} />,      color: C.gold },
    { id: 'concepts',     label: 'All Concepts',icon: <FlaskConical size={15} />,color: C.cyan },
  ];

  const visibleConcepts = {
    panchang:   concepts.filter(c => c.tags.includes('Panchang')),
    numerology: concepts.filter(c => c.tags.includes('Numerology')),
    concepts:   concepts,
  }[activeTab] || concepts;

  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px 100px', maxWidth: '960px', margin: '0 auto' }}>

      {/* ── Hero ── */}
      <div style={{
        textAlign: 'center', marginBottom: '52px',
        padding: '52px 24px 44px',
        borderRadius: '28px',
        background: 'linear-gradient(145deg, rgba(168,85,247,0.08), rgba(56,189,248,0.06), rgba(251,191,36,0.05))',
        border: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative orbs */}
        <div style={{
          position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
          top: '-80px', right: '-80px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)',
          bottom: '-60px', left: '-40px', pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px', borderRadius: '999px',
          background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)',
          fontSize: '12px', fontWeight: 700, color: C.purple,
          letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px',
        }}>
          <FlaskConical size={13} /> Science + Spirituality
        </div>

        <h1 style={{
          fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 900, marginBottom: '10px', lineHeight: 1.15,
          background: `linear-gradient(135deg, ${C.gold}, ${C.orange}, ${C.purple})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          AstroLogic
        </h1>
        <h2 style={{ fontSize: 'clamp(15px, 2vw, 20px)', color: '#d1d5db', fontWeight: 400, marginBottom: '16px' }}>
          The Real Math &amp; Astronomy Behind the Stars
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          Every Tithi, Nakshatra, Yoga, and Numerology result you see in AstroVaani is calculated from
          real astronomical formulae. This page opens the hood — explore the exact algorithms, live traces,
          and the ancient logic behind each calculation.
        </p>
      </div>

      {/* ── Quick Fact Pills ── */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
          ⚡ Key Astronomical Constants
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {facts.map((f, i) => (
            <div key={i} style={{
              padding: '8px 16px', borderRadius: '999px', fontSize: '12px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '10px 22px', borderRadius: '999px', fontSize: '13px', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s',
              background: activeTab === t.id
                ? `linear-gradient(135deg, ${t.color}cc, ${t.color}88)`
                : 'rgba(255,255,255,0.05)',
              color: activeTab === t.id ? '#fff' : '#9ca3af',
              border: activeTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: activeTab === t.id ? `0 4px 20px ${t.color}30` : 'none',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Concept Cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {visibleConcepts.map(concept => (
          <SectionCard
            key={concept.id}
            title={concept.title}
            emoji={concept.emoji}
            color={concept.color}
          >
            {({ showCode, setShowCode }) => (
              <div>
                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {concept.tags.map(t => <Tag key={t} text={t} color={concept.color} />)}
                </div>

                {/* Formula */}
                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  📐 Core Formula
                </div>
                <FormulaBox formula={concept.formula} color={concept.color} />

                {/* Why section */}
                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  🔭 The Astronomical Logic
                </div>
                <div style={{
                  fontSize: '14px', color: '#d1d5db', lineHeight: 1.75,
                  marginBottom: '24px', padding: '16px 20px',
                  background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  {concept.why}
                </div>

                {/* Live Demo */}
                {concept.liveDemo && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      fontSize: '12px', color: '#9ca3af', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <Zap size={13} /> Live Step-by-Step Trace
                    </div>
                    <div style={{
                      padding: '20px', borderRadius: '16px',
                      background: `${concept.color}08`, border: `1px solid ${concept.color}20`,
                    }}>
                      {concept.liveDemo}
                    </div>
                  </div>
                )}

                {/* Code toggle */}
                <button
                  onClick={() => setShowCode(v => !v)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 18px', borderRadius: '10px',
                    background: showCode ? `${concept.color}20` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${showCode ? concept.color + '40' : 'rgba(255,255,255,0.08)'}`,
                    color: showCode ? concept.color : '#9ca3af',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.2s',
                    marginBottom: showCode ? '14px' : 0,
                  }}
                >
                  <Code2 size={14} />
                  {showCode ? 'Hide Source Code' : 'View Source Code (JavaScript)'}
                </button>

                {showCode && <CodeBlock code={concept.code} />}
              </div>
            )}
          </SectionCard>
        ))}
      </div>

      {/* ── Bottom callout ── */}
      <div style={{
        marginTop: '52px', padding: '32px 36px', borderRadius: '22px',
        background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(56,189,248,0.07))',
        border: '1px solid rgba(168,85,247,0.2)',
        display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap',
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
          background: 'rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px',
        }}>⚗️</div>
        <div>
          <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            Approximate vs. Precise Calculations
          </div>
          <div style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7, maxWidth: '680px' }}>
            The algorithms shown here use <strong style={{ color: '#d1d5db' }}>astronomically-grounded approximations</strong> that
            are accurate for educational and general use. Professional Panchang software uses
            NASA's JPL ephemeris data with observer location (latitude/longitude/altitude),
            atmospheric refraction corrections, and the IAU 2006 precession model for sub-arcminute accuracy.
            For exact muhurtas, always consult a qualified Jyotishi or almanac specific to your city.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
