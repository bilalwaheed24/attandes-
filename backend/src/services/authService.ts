import { UserModel } from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { hashPassword, comparePassword } from '../utils/crypto.js';
import { validateEmail, validatePassword } from '../utils/validators.js';

export class AuthService {
  static async signup(name: string, email: string, phone: string, password: string) {
    // Validate inputs
    const emailValidation = validateEmail(email);
    if (emailValidation.error) {
      throw new Error('Invalid email format');
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation.error) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check if user exists
    const existingEmail = await UserModel.findByEmail(email);
    if (existingEmail) {
      throw new Error('duplicate key');
    }

    const existingPhone = await UserModel.findByPhone(phone);
    if (existingPhone) {
      throw new Error('duplicate key');
    }

    // Hash password and create user
    const password_hash = await hashPassword(password);
    const user = await UserModel.create(name, email, phone, password_hash);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken({
        id: user.id,
        email: user.email,
        role: user.role as 'Admin' | 'Employee',
      }),
    };
  }

  static async login(email: string, password: string) {
    // Validate inputs
    const emailValidation = validateEmail(email);
    if (emailValidation.error) {
      throw new Error('Invalid email format');
    }

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare password
    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    if (user.status !== 'Active') {
      throw new Error('User account is inactive');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken({
        id: user.id,
        email: user.email,
        role: user.role as 'Admin' | 'Employee',
      }),
    };
  }
}
