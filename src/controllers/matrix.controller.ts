import { Request, Response, NextFunction } from 'express';
import { MatrixService } from '../services/matrix.service';

export class MatrixController {
  public qrFactorization = async (req: Request, res: Response, next: NextFunction) => {
    return MatrixService.qrFactorization(req, res, next);
  }
} 