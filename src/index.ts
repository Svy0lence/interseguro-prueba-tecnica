import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { matrixRoutes } from './routes/matrix.routes';
import { statsRoutes } from './routes/stats.routes';
import { userRoutes } from './routes/user.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { authMiddleware } from './middlewares/auth.middleware';
import { connectDatabase } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_PREFIX = '/api/v1';

connectDatabase();

app.use(cors());
app.use(express.json());

// Rutas públicas
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Rutas de autenticación
app.use(`${API_PREFIX}/auth`, userRoutes);

// Rutas protegidas
app.use(`${API_PREFIX}/matrix`, authMiddleware, matrixRoutes);
app.use(`${API_PREFIX}/stats`, authMiddleware, statsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
}); 