"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, name: string, role?: 'user' | 'admin') => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth status on mount and when storage changes
    const checkAuth = () => {
      const auth = sessionStorage.getItem('isAuthenticated');
      const email = sessionStorage.getItem('userEmail');
      const name = sessionStorage.getItem('userName');
      const role = sessionStorage.getItem('userRole') as 'user' | 'admin' | null;
      
      setIsAuthenticated(auth === 'true');
      if (email && name) {
        setUser({ 
          email, 
          name, 
          role: role === 'admin' ? 'admin' : 'user' 
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for storage changes (in case of logout from another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const login = (email: string, name: string, role: 'user' | 'admin' = 'user') => {
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUser({ email, name, role });
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}