import { Router } from 'express';
import { authRoutes } from './auth.js';
import { attendanceRoutes } from './attendance.js';
import { adminRoutes } from './admin.js';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/attendance', attendanceRoutes);
routes.use('/admin', adminRoutes);

routes.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
