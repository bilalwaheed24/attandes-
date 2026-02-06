import { UserModel } from '../models/User.js';

export class AdminService {
  static async getAllEmployees() {
    return await UserModel.findAll('Active');
  }

  static async getEmployee(id: string) {
    return await UserModel.findById(id);
  }

  static async disableEmployee(id: string) {
    return await UserModel.update(id, { status: 'Inactive' });
  }

  static async resetEmployeePassword(id: string, newPassword: string) {
    // This will be implemented with password reset logic
    // For now, just mark as needing reset
    return await UserModel.update(id, { status: 'Active' });
  }
}
