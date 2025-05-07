import mongoose from 'mongoose';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interseguro');
    console.log('Conectado a MongoDB');

    await createDefaultUser();
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

const createDefaultUser = async () => {
  try {
    const defaultUser = await User.findOne({ email: 'admin@interseguro.com' });
    
    if (!defaultUser) {
      const hashedPassword = await AuthService.hashPassword('admin123');
      
      await User.create({
        email: 'admin@interseguro.com',
        password: hashedPassword,
        name: 'Administrador'
      });
      
      console.log('Usuario por defecto creado exitosamente');
    }
  } catch (error) {
    console.error('Error creando usuario por defecto:', error);
  }
}; 