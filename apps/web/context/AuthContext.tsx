'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  state: string;
  district: string;
  preferred_language: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loginAsGuest: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for existing session
    const saved = localStorage.getItem('grambiz_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved user');
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('grambiz_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grambiz_user');
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest-judge-demo',
      name: 'Guest Judge / Evaluator',
      email: 'guest@judge.gov.in',
      mobile: '9876500000',
      role: 'guest',
      state: 'Uttar Pradesh',
      district: 'Meerut',
      preferred_language: 'en',
      isGuest: true
    };
    login(guestUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
