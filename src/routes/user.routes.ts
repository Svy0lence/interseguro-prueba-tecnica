import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateDto } from '../middlewares/validation.middleware';
import { LoginDto, RegisterDto } from '../dtos/user.dto';

const router = Router();
const userController = new UserController();

router.post('/register', validateDto(RegisterDto), userController.register);
router.post('/login', validateDto(LoginDto), userController.login);

export const userRoutes = router; 