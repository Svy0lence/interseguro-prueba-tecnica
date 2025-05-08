import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { HttpException } from '../middlewares/error.middleware';

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';
  private static readonly JWT_EXPIRES_IN = '24h';
  private static readonly SALT_ROUNDS = 8;

  static generateToken(userId: string): string {
    const payload = {
      userId
    };
    
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN });
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new HttpException(401, 'Token inválido');
    }
  }
} 