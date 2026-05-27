import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../types/api.types';

export class AuthController {
    /**
     * POST /api/auth/register
     */
    static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password, profileId } = req.body;

            // Validar que todos los campos estén presentes
            if (!name || !email || !password || !profileId) {
                res.status(400).json({
                    status: 'error',
                    message: 'Todos los campos son requeridos: name, email, password, profileId',
                    code: 400,
                } as ApiResponse);
                return;
            }

            const { user, token } = await AuthService.register(name, email, password, profileId);

            res.status(201).json({
                status: 'success',
                data: { user, token },
                message: 'Usuario registrado exitosamente',
            } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/auth/login
     */
    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            // Validar que ambos campos estén presentes
            if (!email || !password) {
                res.status(400).json({
                    status: 'error',
                    message: 'Email y contraseña son requeridos',
                    code: 400,
                } as ApiResponse);
                return;
            }

            const { user, token } = await AuthService.login(email, password);

            res.status(200).json({
                status: 'success',
                data: { user, token },
                message: 'Login exitoso',
            } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }
}