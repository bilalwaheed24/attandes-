import { Router } from 'express';
import { AttendanceController } from '../controllers/attendanceController.js';
import { authMiddleware } from '../middleware/auth.js';

export const attendanceRoutes = Router();

attendanceRoutes.use(authMiddleware);

attendanceRoutes.post('/submit', AttendanceController.submit);
attendanceRoutes.get('/today', AttendanceController.getToday);
attendanceRoutes.get('/history', AttendanceController.getHistory);
attendanceRoutes.get('/summary', AttendanceController.getMonthlySummary);
