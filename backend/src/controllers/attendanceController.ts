import { Response } from 'express';
import { AttendanceService } from '../services/attendanceService.js';
import { AuthRequest } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

export class AttendanceController {
  static async submit(req: AuthRequest, res: Response) {
    try {
      const { status, extra_hours = 0, remarks } = req.body;
      const user_id = req.user!.id;

      if (!status) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Status is required'
        });
      }

      const result = await AttendanceService.submitAttendance(user_id, status, extra_hours, remarks);
      logger.info('Attendance submitted:', { user_id, status });

      res.status(201).json(result);
    } catch (error: any) {
      logger.error('Attendance submission error:', error);
      
      if (error.message === 'Attendance already submitted') {
        return res.status(409).json({
          error: 'Duplicate Submission',
          message: 'Attendance already submitted for today'
        });
      }

      res.status(400).json({
        error: 'Bad Request',
        message: error.message || 'Failed to submit attendance'
      });
    }
  }

  static async getToday(req: AuthRequest, res: Response) {
    try {
      const user_id = req.user!.id;
      const result = await AttendanceService.getTodayStatus(user_id);
      res.json(result);
    } catch (error) {
      logger.error('Get today error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to get today status'
      });
    }
  }

  static async getHistory(req: AuthRequest, res: Response) {
    try {
      const user_id = req.user!.id;
      const limit = parseInt(req.query.limit as string) || 30;
      const result = await AttendanceService.getHistory(user_id, limit);
      res.json({ data: result });
    } catch (error) {
      logger.error('Get history error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to get history'
      });
    }
  }

  static async getMonthlySummary(req: AuthRequest, res: Response) {
    try {
      const user_id = req.user!.id;
      const { month } = req.query;

      if (!month) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Month parameter is required (YYYY-MM)'
        });
      }

      const summary = await AttendanceService.getMonthlySummary(user_id, month as string);
      const history = await AttendanceService.getHistory(user_id, 31);

      res.json({
        summary,
        history: history.filter(h => (h.attendance_date as any).toString().startsWith(month))
      });
    } catch (error) {
      logger.error('Get monthly summary error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to get summary'
      });
    }
  }
}
