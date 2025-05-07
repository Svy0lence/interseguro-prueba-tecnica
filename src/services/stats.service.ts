import { Request, Response, NextFunction } from 'express';
import { StatsDto } from '../dtos/stats.dto';
import { HttpException } from '../middlewares/error.middleware';
import { 
    flattenMatrix, 
    calculateAverage, 
    calculateSum, 
    isMatrixDiagonal
} from './utils/utils.service';

export class StatsService {
  public static calculateStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {Q, R} = req.body as StatsDto;

      const allValues = [...flattenMatrix(Q), ...flattenMatrix(R)];
      
      const stats = {
        maxValue: Math.max(...allValues),
        minValue: Math.min(...allValues),
        average: calculateAverage(allValues),
        totalSum: calculateSum(allValues),
        isDiagonal: isMatrixDiagonal(Q) || isMatrixDiagonal(R)
      };

      return res.status(200).json({
        status: 'success',
        data: stats
      });
    } catch (error) {
      console.log(error)
      next(new HttpException(500, 'Error al procesar las estadísticas'));
    }
  }

  
} 