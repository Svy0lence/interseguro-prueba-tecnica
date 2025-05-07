import { User, IUser } from '../models/user.model';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from '../dtos/user.dto';
import { Request, Response, NextFunction } from 'express';

export class UserService {
  static async register(req: Request, res: Response, next: NextFunction) {
    const {email, password, name}: RegisterDto = req.body

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const user = new User({
      email: email,
      password: hashedPassword,
      name: name
    });

    await user.save();

    const token = AuthService.generateToken(user?.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const {email, password}: LoginDto = req.body
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isValidPassword = await AuthService.comparePasswords(password, user?.password);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    const token = AuthService.generateToken(user.id);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  }
} 