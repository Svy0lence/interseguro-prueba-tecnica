import { User, IUser } from '../models/user.model';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from '../dtos/user.dto';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../middlewares/error.middleware';

export class UserService {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      if(error instanceof HttpException) {
        next(error);
      }else {
        next(new HttpException(500, 'Error al registrar al usuario'));
      }
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {

    try {
      const {email, password}: LoginDto = req.body
      
      const user = await User.findOne({ email });
      if (!user) {
        throw new HttpException(401, 'Credenciales inválidas');
      }

      const isValidPassword = await AuthService.comparePasswords(password, user?.password);
      if (!isValidPassword) {
        throw new HttpException(401, 'Credenciales inválidas');
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
    } catch (error) {
      if(error instanceof HttpException) {
        next(error);
      }else {
        next(new HttpException(500, 'Error autenticar al usuario'));
      }
    }
  }
} 