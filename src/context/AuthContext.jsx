import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('astrovaani_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch (_) {}
    }
  }, []);

  /** Called after successful Google sign-in */
  const loginWithGoogle = (profile) => {
    const u = {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      avatar: profile.picture,
      type: 'user',
      provider: 'google',
    };
    setUser(u);
    localStorage.setItem('astrovaani_user', JSON.stringify(u));
  };

  /** Called after successful username/password login */
  const loginWithCredentials = (serverUser) => {
    const u = { ...serverUser, provider: 'credentials' };
    setUser(u);
    localStorage.setItem('astrovaani_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('astrovaani_user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginWithCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
