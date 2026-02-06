import { Router } from 'express';
import { AdminController } from '../controllers/adminController.js';
import { authMiddleware, adminOnlyMiddleware } from '../middleware/auth.js';

export const adminRoutes = Router();

adminRoutes.use(authMiddleware);
adminRoutes.use(adminOnlyMiddleware);

adminRoutes.get('/employees', AdminController.getEmployees);
adminRoutes.get('/attendance-summary', AdminController.getAttendanceSummary);
adminRoutes.post('/export', AdminController.exportData);
