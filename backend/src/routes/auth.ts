import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

export const authRoutes = Router();

authRoutes.post('/signup', AuthController.signup);
authRoutes.post('/login', AuthController.login);
