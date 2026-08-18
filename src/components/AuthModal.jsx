import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { loginWithGoogle, loginWithCredentials } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user');
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  // ── Google OAuth ──────────────────────────────────────────────────────────
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = await res.json();
        loginWithGoogle(profile);
        onClose();
      } catch {
        setError('Google sign-in failed. Please try again.');
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => setError('Google sign-in was cancelled or failed.'),
  });

  if (!isOpen) return null;


  // ── Credentials Login/Register ────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/login' : '/api/register';
    try {
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('token', data.token);
      loginWithCredentials(data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const inputStyle = {
    padding: '14px 20px', borderRadius: '12px', width: '100%', boxSizing: 'border-box',
    border: '1px solid rgba(255,255,255,0.1)', outline: 'none',
    background: 'rgba(255,255,255,0.05)', color: 'var(--color-text)', fontSize: '14px',
    fontFamily: 'inherit',
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: '420px', maxWidth: '95vw', padding: '40px', borderRadius: '28px', position: 'relative',
        background: 'rgba(14,14,20,0.95)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.06)',
          border: 'none', borderRadius: '8px', width: '32px', height: '32px', display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#9ca3af',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
        >
          <X size={18} />
        </button>

        <div className="floating-element" style={{ marginBottom: '14px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden',
            border: '2px solid rgba(251,191,36,0.4)',
            boxShadow: '0 0 24px rgba(168,85,247,0.5)',
          }}>
            <img src="/logo.png" alt="AstroVaani" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <h2 style={{ marginBottom: '6px', fontSize: '1.7rem', textAlign: 'center', color: '#fff', fontWeight: 700 }}>
          {isLogin ? 'Welcome Back' : 'Join the Universe'}
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '28px', textAlign: 'center' }}>
          {isLogin ? 'Sign in to continue your cosmic journey.' : 'Create your account to begin.'}
        </p>

        {error && (
          <div style={{
            color: '#f87171', marginBottom: '16px', textAlign: 'center',
            background: 'rgba(248,113,113,0.1)', padding: '10px 14px', borderRadius: '10px',
            width: '100%', fontSize: '13px', border: '1px solid rgba(248,113,113,0.2)',
          }}>
            {error}
          </div>
        )}

        {/* ── Google Sign-In Button ── */}
        <button
          onClick={() => { setError(''); googleLogin(); }}
          disabled={googleLoading}
          style={{
            width: '100%', padding: '13px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)',
            background: googleLoading ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)',
            color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            fontFamily: 'inherit', marginBottom: '20px', transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { if (!googleLoading) { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
        >
          {/* Google SVG Logo */}
          {googleLoading ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <path d="M12 2 A10 10 0 0 1 22 12" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
              </path>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          )}
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>or continue with email</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* ── Username / Password Form ── */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
          {!isLogin && (
            <select value={type} onChange={e => setType(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', WebkitAppearance: 'none' }}>
              <option value="user">I am a Seeker (User)</option>
              <option value="astrologer">I am a Mystic (Astrologer)</option>
            </select>
          )}
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
          <button type="submit" style={{
            padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, var(--color-primary), #d97706)',
            color: '#1a1a1a', fontWeight: 700, fontSize: '15px', fontFamily: 'inherit',
            marginTop: '4px', transition: 'filter 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; }}
          >
            {isLogin ? '✦ Sign In' : '✦ Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '22px', fontSize: '13px', color: '#9ca3af' }}>
          {isLogin ? "New to AstroVaani? " : "Already have an account? "}
          <span style={{ color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 700 }} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}
