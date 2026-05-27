import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/api.types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generar token JWT
 */
export function generateToken(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    } as any);
}

/**
 * Verificar y decodificar token JWT
 */
export function verifyToken(token: string): JwtPayload {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    } catch (error) {
        throw new Error('Token inválido o expirado');
    }
}

/**
 * Extraer token del header Authorization
 */
export function extractToken(authHeader: string | undefined): string | null {
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    return parts[1];
}