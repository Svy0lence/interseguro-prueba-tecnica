import { Request, Response, NextFunction } from 'express';
import { StatsService } from '../services/stats.service';

export class StatsController {
  public calculateStats = async (req: Request, res: Response, next: NextFunction) => {
    return StatsService.calculateStats(req, res, next);
  }
} 