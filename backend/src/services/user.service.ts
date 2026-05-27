import { prisma } from '../prisma/client';
import { NotFoundError, ValidationError } from '../utils/errors';
import { validateEmail, isValidName } from '../utils/validators';

export class UserService {
    /**
     * Obtener todos los usuarios
     */
    static async getAllUsers() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                profileId: true,
                profile: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Obtener usuario por ID
     */
    static async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                profileId: true,
                profile: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }

        return user;
    }

    /**
     * Crear usuario
     */
    static async createUser(name: string, email: string, profileId: string) {
        if (!isValidName(name)) {
            throw new ValidationError('El nombre debe tener entre 2 y 100 caracteres');
        }

        if (!validateEmail(email)) {
            throw new ValidationError('Email inválido');
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new ValidationError('El email ya existe');
        }

        const profile = await prisma.profile.findUnique({ where: { id: profileId } });
        if (!profile) {
            throw new NotFoundError('Perfil no encontrado');
        }

        return await prisma.user.create({
            data: { name, email, password: 'temp', profileId },
            select: {
                id: true,
                name: true,
                email: true,
                profileId: true,
                profile: true,
            },
        });
    }

    /**
     * Actualizar usuario
     */
    static async updateUser(id: string, name?: string, profileId?: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }

        const data: any = {};
        if (name && isValidName(name)) data.name = name;
        if (profileId) {
            const profile = await prisma.profile.findUnique({ where: { id: profileId } });
            if (!profile) throw new NotFoundError('Perfil no encontrado');
            data.profileId = profileId;
        }

        return await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                profileId: true,
                profile: true,
            },
        });
    }

    /**
     * Eliminar usuario
     */
    static async deleteUser(id: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }

        return await prisma.user.delete({ where: { id } });
    }
}