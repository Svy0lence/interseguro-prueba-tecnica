import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { matrixRoutes } from './routes/matrix.routes';
import { statsRoutes } from './routes/stats.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_PREFIX = '/api/v1';

// Middleware
app.use(cors());
app.use(express.json());

// Routes con prefijo global
app.use(`${API_PREFIX}/matrix`, matrixRoutes);
app.use(`${API_PREFIX}/stats`, statsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Manejador de rutas no encontradas (debe ir después de todas las rutas)
app.use(notFoundHandler);

// Manejador de errores (debe ir al final)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
}); 