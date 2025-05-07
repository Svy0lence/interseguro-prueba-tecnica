import { Request, Response, NextFunction } from 'express';

export class HttpException extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.name = 'HttpException';
  }
}

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `No se encontró la ruta: ${req.method} ${req.originalUrl}`,
    path: req.originalUrl,
    method: req.method
  });
};

export const errorHandler = (
  error: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpException) {
    return res.status(error.status).json({
      status: 'error',
      message: error.message
    });
  }

  console.error('Error no controlado:', error);
  return res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  });
}; 