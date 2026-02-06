import { Response } from 'express';
import { AdminService } from '../services/adminService.js';
import { AttendanceService } from '../services/attendanceService.js';
import { AuthRequest } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

export class AdminController {
  static async getEmployees(req: AuthRequest, res: Response) {
    try {
      const employees = await AdminService.getAllEmployees();
      res.json({ data: employees });
    } catch (error) {
      logger.error('Get employees error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to get employees'
      });
    }
  }

  static async getAttendanceSummary(req: AuthRequest, res: Response) {
    try {
      const { month = new Date().toISOString().slice(0, 7) } = req.query;

      const summary = await AttendanceService.getAllMonthlySummary(month as string);
      res.json({ data: summary });
    } catch (error) {
      logger.error('Get attendance summary error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to get summary'
      });
    }
  }

  static async exportData(req: AuthRequest, res: Response) {
    try {
      const { month = new Date().toISOString().slice(0, 7) } = req.body;

      const data = await AttendanceService.getAllMonthlySummary(month as string);

      // Create CSV
      const csv = [
        ['Employee ID', 'Name', 'Email', 'Reached', 'Late', 'Off', 'Extra Hours'].join(','),
        ...data.map(d =>
          [d.id, d.name, d.email, d.reached_days, d.late_days, d.off_days, d.total_extra_hours].join(',')
        )
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="attendance-${month}.csv"`);
      res.send(csv);

      logger.info('Data exported:', { month, user: req.user?.id });
    } catch (error) {
      logger.error('Export error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to export data'
      });
    }
  }
}
