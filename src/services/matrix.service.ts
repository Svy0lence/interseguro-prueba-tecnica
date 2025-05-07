import { Request, Response, NextFunction } from 'express';
import { matrix as Matrix, qr } from 'mathjs';
import { MatrixDto } from '../dtos/matrix.dto';
import { HttpException } from '../middlewares/error.middleware';

export class MatrixService {
    public static qrFactorization = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {matrix} = req.body as MatrixDto;
            
            const m = Matrix(matrix);

            const { Q, R } = qr(m);

            const QArray = Q.valueOf();
            const RArray = R.valueOf();

            return res.status(200).json({
                status: 'success',
                data: {
                Q: QArray,
                R: RArray
                }
            });
        } catch (error) {
        console.log(error)
        next(new HttpException(500, 'Error al procesar la matriz'));
        }
    }
} 