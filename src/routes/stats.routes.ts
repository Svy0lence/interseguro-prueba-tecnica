import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import { validateDto } from '../middlewares/validation.middleware';
import { StatsDto } from '../dtos/stats.dto';

const router = Router();
const statsController = new StatsController();

router.post('/calculate', validateDto(StatsDto), statsController.calculateStats);

export const statsRoutes = router; 