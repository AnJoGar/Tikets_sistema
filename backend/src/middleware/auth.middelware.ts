import { Request, Response, NextFunction } from 'express';
import { extractToken, verifyToken } from '../utils/jwt.utils';
import { UnauthorizedError } from '../utils/errors';
import { JwtPayload } from '../types/api.types';

/**
 * Extend Express Request para incluir usuario
 */
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

/**
 * Middleware de autenticación JWT
 */
export function authenticateToken(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers['authorization'];
        const token = extractToken(authHeader);

        if (!token) {
            throw new UnauthorizedError('Token no proporcionado');
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}

/**
 * Middleware para verificar que el usuario tiene un rol específico
 */
export function authorize(requiredProfiles: string[]) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new UnauthorizedError('No autenticado');
            }

            if (!requiredProfiles.includes(req.user.profileId)) {
                throw new UnauthorizedError('Acceso denegado');
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}