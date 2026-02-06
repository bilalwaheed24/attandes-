import { AttendanceModel } from '../models/Attendance.js';
import { validateAttendanceStatus, validateExtraHours } from '../utils/validators.js';

export class AttendanceService {
  static async submitAttendance(user_id: string, status: string, extra_hours: number = 0, remarks?: string) {
    // Validate status
    if (!validateAttendanceStatus(status)) {
      throw new Error('Invalid attendance status');
    }

    // Validate extra hours
    if (!validateExtraHours(extra_hours)) {
      throw new Error('Invalid extra hours');
    }

    // Check if already submitted today
    const existing = await AttendanceModel.findTodayByUser(user_id);
    if (existing) {
      throw new Error('Attendance already submitted');
    }

    // Create attendance record
    return await AttendanceModel.create(user_id, status, extra_hours, remarks);
  }

  static async getTodayStatus(user_id: string) {
    const attendance = await AttendanceModel.findTodayByUser(user_id);
    return attendance || { status: 'Not Submitted', submitted_at: null };
  }

  static async getHistory(user_id: string, limit: number = 30) {
    return await AttendanceModel.findUserHistory(user_id, limit);
  }

  static async getMonthlySummary(user_id: string, month: string) {
    return await AttendanceModel.findMonthSummary(user_id, month);
  }

  static async getAllMonthlySummary(month: string) {
    return await AttendanceModel.findAllMonthSummary(month);
  }
}
