import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Employee';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [token, setToken] = useState<string | null>(authService.getToken());

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    authService.setToken(result.token);
    authService.setUser(result);
    setUser(result);
    setToken(result.token);
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    const result = await authService.signup(name, email, phone, password);
    authService.setToken(result.token);
    authService.setUser(result);
    setUser(result);
    setToken(result.token);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
