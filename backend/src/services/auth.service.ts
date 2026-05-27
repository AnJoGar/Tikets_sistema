import { prisma } from '../prisma/client';
import { hashPassword, comparePassword, validatePasswordStrength } from '../utils/password.utils';
import { generateToken, verifyToken } from '../utils/jwt.utils';
import { validateEmail } from '../utils/validators';
import { ValidationError, ConflictError, UnauthorizedError } from '../utils/errors';

export class AuthService {
    /**
     * Registro de nuevo usuario
     */
    static async register(
        name: string,
        email: string,
        password: string,
        profileId: string
    ) {
        // Validar inputs
        if (!name || name.trim().length < 2) {
            throw new ValidationError('El nombre debe tener al menos 2 caracteres');
        }

        if (!validateEmail(email)) {
            throw new ValidationError('Email inválido');
        }

        // Validar contraseña fuerte
        const passwordValidation = validatePasswordStrength(password);
        if (!passwordValidation.isValid) {
            throw new ValidationError(passwordValidation.errors.join(', '));
        }

        // Validar que email no existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictError('El email ya está registrado');
        }

        // Validar que profile existe
        const profile = await prisma.profile.findUnique({
            where: { id: profileId },
        });

        if (!profile) {
            throw new ValidationError('El perfil seleccionado no existe');
        }

        // Hash de contraseña
        const hashedPassword = await hashPassword(password);

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                profileId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                profileId: true,
                createdAt: true,
            },
        });

        // Generar token
        const token = generateToken({
            id: user.id,
            email: user.email,
            profileId: user.profileId,
        });

        return { user, token };
    }

    /**
     * Login de usuario
     */
    static async login(email: string, password: string) {
        // Validar inputs
        if (!validateEmail(email)) {
            throw new ValidationError('Email inválido');
        }

        if (!password) {
            throw new ValidationError('Contraseña requerida');
        }

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                profile: true,
            },
        });

        if (!user) {
            throw new UnauthorizedError('Email o contraseña incorrectos');
        }

        // Comparar contraseña
        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedError('Email o contraseña incorrectos');
        }

        // Generar token
        const token = generateToken({
            id: user.id,
            email: user.email,
            profileId: user.profileId,
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profileId: user.profileId,
                profile: user.profile,
            },
            token,
        };
    }

    /**
     * Verificar y decodificar token
     */
    static async verifyToken(token: string) {
        try {
            const decoded = verifyToken(token);
            return decoded;
        } catch (error) {
            throw new UnauthorizedError('Token inválido o expirado');
        }
    }
}