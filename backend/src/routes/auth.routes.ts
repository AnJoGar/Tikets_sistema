import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

/**
 * POST /api/auth/register
 * Registrar un nuevo usuario
 */
router.post('/register', AuthController.register);

/**
 * POST /api/auth/login
 * Login de usuario existente
 */
router.post('/login', AuthController.login);

export default router;
