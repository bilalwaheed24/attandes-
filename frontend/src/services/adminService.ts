import { apiClient } from './api';

export const adminService = {
  async getEmployees() {
    return apiClient.get('/admin/employees');
  },

  async getAttendanceSummary(month?: string) {
    const monthParam = month || new Date().toISOString().slice(0, 7);
    return apiClient.get(`/admin/attendance-summary?month=${monthParam}`);
  },

  async exportData(month?: string) {
    const monthParam = month || new Date().toISOString().slice(0, 7);
    const data = await apiClient.post('/admin/export', { month: monthParam });
    return data;
  },
};
