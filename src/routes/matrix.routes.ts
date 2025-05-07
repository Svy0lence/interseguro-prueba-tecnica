import { Router } from 'express';
import { MatrixController } from '../controllers/matrix.controller';
import { validateDto } from '../middlewares/validation.middleware';
import { MatrixDto } from '../dtos/matrix.dto';

const router = Router();
const matrixController = new MatrixController();

router.post('/qr', validateDto(MatrixDto), matrixController.qrFactorization);

export const matrixRoutes = router; 