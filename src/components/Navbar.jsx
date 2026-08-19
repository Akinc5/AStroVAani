import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, LogOut, LayoutDashboard, User as UserIcon } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

const consultationLinks = [
  { label: 'Chat with Astrologer', path: '/consultations?mode=chat' },
  { label: 'Talk to Astrologer', path: '/consultations?mode=call' },
  { label: 'Video Consultation', path: '/consultations?mode=video' },
];

const horoscopeLinks = [
  { label: 'Daily Horoscope', type: 'today' },
  { label: "Tomorrow's Horoscope", type: 'tomorrow' },
  { label: "Yesterday's Horoscope", type: 'yesterday' },
  { label: 'Weekly Horoscope', type: 'weekly' },
  { label: 'Monthly Horoscope', type: 'monthly' },
  { label: 'Yearly Horoscope', type: 'yearly' },
];

const freeServicesLinks = [
  { label: 'Free Kundli', path: '/free-services' },
  { label: 'Kundli Matching', path: '/free-services' },
  { label: 'Numerology', path: '/calculators' },
  { label: 'Love Compatibility', path: '/calculators?tab=love' },
  { label: 'Daily Tarot', path: '/horoscope' },
];

const calculatorLinks = [
  { label: 'Numerology Calculator', path: '/calculators' },
  { label: 'Love Compatibility', path: '/calculators?tab=love' },
  { label: 'Lucky Number', path: '/calculators?tab=lucky' },
];

const panchangLinks = [
  { label: "Today's Panchang", path: '/panchang' },
  { label: 'Auspicious Times', path: '/panchang' },
  { label: 'Rahu Kaal', path: '/panchang' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'horoscope' | 'consultations' | etc.
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setUserMenuOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') { setOpenDropdown(null); setUserMenuOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = (name) => setOpenDropdown(prev => prev === name ? null : name);

  // ── Reusable dropdown item ───────────────────────────────────────────────
  const DropdownItem = ({ label, onClick }) => (
    <button
      onClick={() => { setOpenDropdown(null); onClick(); }}
      style={{
        display: 'block', width: '100%', padding: '9px 14px',
        fontSize: '13px', color: '#d1d5db', textAlign: 'left',
        background: 'transparent', border: 'none', borderRadius: '8px',
        cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d1d5db'; }}
    >
      {label}
    </button>
  );

  // ── Reusable nav trigger ─────────────────────────────────────────────────
  const NavTrigger = ({ label, name }) => (
    <button
      onClick={() => toggleDropdown(name)}
      style={{
        display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px',
        color: openDropdown === name ? '#fff' : '#d1d5db', background: 'none', border: 'none',
        cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
        opacity: 0.9, whiteSpace: 'nowrap', padding: 0, transition: 'color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={e => { e.currentTarget.style.color = openDropdown === name ? '#fff' : '#d1d5db'; }}
    >
      {label}
      <ChevronDown size={13} style={{
        transform: openDropdown === name ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 0.3s',
      }} />
    </button>
  );

  const dropdownStyle = {
    position: 'absolute', top: 'calc(100% + 12px)', left: 0, minWidth: '200px',
    borderRadius: '14px', overflow: 'hidden',
    background: 'rgba(12,12,18,0.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
    padding: '8px', zIndex: 2000,
  };

  return (
    <>
      <div style={{
        width: '100%', display: 'flex', justifyContent: 'center',
        position: 'sticky', top: 0, zIndex: 1000, padding: '16px 20px 12px',
      }}>
        <nav ref={navRef} style={{
          width: '100%', maxWidth: '1100px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden',
              border: '1.5px solid rgba(251,191,36,0.5)',
              boxShadow: '0 0 18px rgba(168,85,247,0.5), 0 0 6px rgba(251,191,36,0.3)',
              flexShrink: 0,
            }}>
              <img src="/logo.png" alt="AstroVaani Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{
              fontWeight: 800, fontSize: '19px', letterSpacing: '0.3px',
              background: 'linear-gradient(90deg, #fbbf24 0%, #f0abfc 60%, #a855f7 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>AstroVaani</span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="navbar-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'center' }}>

            {/* Consultations */}
            <div style={{ position: 'relative' }}>
              <NavTrigger label="Consultations" name="consultations" />
              {openDropdown === 'consultations' && (
                <div className="animate-fade-in" style={dropdownStyle}>
                  {consultationLinks.map(l => <DropdownItem key={l.label} label={l.label} onClick={() => navigate(l.path)} />)}
                </div>
              )}
            </div>

            {/* Horoscope */}
            <div style={{ position: 'relative' }}>
              <NavTrigger label="Horoscope" name="horoscope" />
              {openDropdown === 'horoscope' && (
                <div className="animate-fade-in" style={dropdownStyle}>
                  {horoscopeLinks.map((l, i) => (
                    <DropdownItem
                      key={l.type}
                      label={l.label}
                      onClick={() => navigate(`/horoscope?type=${l.type}`)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Free Services */}
            <div style={{ position: 'relative' }}>
              <NavTrigger label="Free Services" name="freeServices" />
              {openDropdown === 'freeServices' && (
                <div className="animate-fade-in" style={dropdownStyle}>
                  {freeServicesLinks.map(l => <DropdownItem key={l.label} label={l.label} onClick={() => navigate(l.path)} />)}
                </div>
              )}
            </div>

            {/* Calculators */}
            <div style={{ position: 'relative' }}>
              <NavTrigger label="Calculators" name="calculators" />
              {openDropdown === 'calculators' && (
                <div className="animate-fade-in" style={dropdownStyle}>
                  {calculatorLinks.map(l => <DropdownItem key={l.label} label={l.label} onClick={() => navigate(l.path)} />)}
                </div>
              )}
            </div>

            {/* Panchang */}
            <div style={{ position: 'relative' }}>
              <NavTrigger label="Panchang" name="panchang" />
              {openDropdown === 'panchang' && (
                <div className="animate-fade-in" style={dropdownStyle}>
                  {panchangLinks.map(l => <DropdownItem key={l.label} label={l.label} onClick={() => navigate(l.path)} />)}
                </div>
              )}
            </div>

            {/* Shop */}
            <NavLink to="/shop" style={({ isActive }) => ({
              fontSize: '14px', color: isActive ? '#fff' : '#d1d5db', textDecoration: 'none',
              fontWeight: 500, opacity: 0.9, transition: 'color 0.2s',
            })}>Shop</NavLink>

            {/* Blog */}
            <NavLink to="/blog" style={({ isActive }) => ({
              fontSize: '14px', color: isActive ? '#fff' : '#d1d5db', textDecoration: 'none',
              fontWeight: 500, opacity: 0.9, transition: 'color 0.2s',
            })}>Blog</NavLink>

            {/* AstroLogic */}
            <NavLink to="/astrologic" style={({ isActive }) => ({
              fontSize: '14px', textDecoration: 'none', fontWeight: 600,
              opacity: isActive ? 1 : 0.9, transition: 'all 0.2s',
              color: isActive ? '#fbbf24' : '#d1d5db',
              display: 'flex', alignItems: 'center', gap: '5px',
            })}>
              <span style={{ fontSize: '14px' }}>⚗️</span> AstroLogic
            </NavLink>
          </div>

          {/* Right: Auth / User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {user ? (
              /* ── Authenticated User ── */
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(prev => !prev)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '6px 14px 6px 6px', borderRadius: '999px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer', color: '#fff', fontFamily: 'inherit', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name || user.username} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #7e22ce)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700,
                    }}>
                      {(user.name || user.username || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span style={{ fontSize: '13px', fontWeight: 600, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name || user.username}
                  </span>
                  <ChevronDown size={13} style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                </button>

                {userMenuOpen && (
                  <div className="animate-fade-in" style={{ ...dropdownStyle, left: 'auto', right: 0, minWidth: '180px' }}>
                    <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '6px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{user.name || user.username}</div>
                      {user.email && <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{user.email}</div>}
                    </div>
                    {user.type === 'astrologer' && (
                      <button onClick={() => { navigate('/dashboard'); setUserMenuOpen(false); }} style={{
                        display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                        padding: '9px 14px', fontSize: '13px', color: '#d1d5db',
                        background: 'transparent', border: 'none', borderRadius: '8px',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <LayoutDashboard size={14} /> Dashboard
                      </button>
                    )}
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} style={{
                      display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                      padding: '9px 14px', fontSize: '13px', color: '#f87171',
                      background: 'transparent', border: 'none', borderRadius: '8px',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Sign In Button ── */
              <button
                onClick={() => setIsAuthOpen(true)}
                style={{
                  width: '80px', height: '38px', borderRadius: '999px', border: 'none',
                  background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                  color: '#1a1a1a', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(251,191,36,0.25)', fontFamily: 'inherit',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(251,191,36,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(251,191,36,0.25)'; }}
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .navbar-desktop-links { display: none !important; }
        }
      `}</style>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
