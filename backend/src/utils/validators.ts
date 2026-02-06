import Joi from 'joi';

export const emailSchema = Joi.string().email().required();
export const passwordSchema = Joi.string().min(6).required();
export const nameSchema = Joi.string().min(2).max(255).required();
export const phoneSchema = Joi.string().pattern(/^[0-9+\-\s()]+$/).required();

export function validateEmail(email: string): { error?: any; value: string } {
  return emailSchema.validate(email);
}

export function validatePassword(password: string): { error?: any; value: string } {
  return passwordSchema.validate(password);
}

export function validateAttendanceStatus(status: string): boolean {
  return ['Reached', 'Late', 'Off'].includes(status);
}

export function validateExtraHours(hours: any): boolean {
  return typeof hours === 'number' && hours >= 0 && hours <= 24;
}
