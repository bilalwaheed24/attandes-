const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = {
  async request(method: string, endpoint: string, data?: any) {
    const token = localStorage.getItem('token');
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  },

  get(endpoint: string) {
    return this.request('GET', endpoint);
  },

  post(endpoint: string, data: any) {
    return this.request('POST', endpoint, data);
  },

  put(endpoint: string, data: any) {
    return this.request('PUT', endpoint, data);
  },

  delete(endpoint: string) {
    return this.request('DELETE', endpoint);
  },
};
