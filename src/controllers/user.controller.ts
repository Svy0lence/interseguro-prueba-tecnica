import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    return UserService.register(req, res, next);
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    return UserService.login(req, res, next);
  }
} 