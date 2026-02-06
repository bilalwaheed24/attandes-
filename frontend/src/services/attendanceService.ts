import { apiClient } from './api';

export const attendanceService = {
  async submit(status: string, extra_hours: number = 0, remarks?: string) {
    return apiClient.post('/attendance/submit', { status, extra_hours, remarks });
  },

  async getToday() {
    return apiClient.get('/attendance/today');
  },

  async getHistory(limit: number = 30) {
    return apiClient.get(`/attendance/history?limit=${limit}`);
  },

  async getMonthlySummary(month: string) {
    return apiClient.get(`/attendance/summary?month=${month}`);
  },
};
