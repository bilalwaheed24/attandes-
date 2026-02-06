import { apiClient } from './api';

export const authService = {
  async signup(name: string, email: string, phone: string, password: string) {
    return apiClient.post('/auth/signup', { name, email, phone, password });
  },

  async login(email: string, password: string) {
    return apiClient.post('/auth/login', { email, password });
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
