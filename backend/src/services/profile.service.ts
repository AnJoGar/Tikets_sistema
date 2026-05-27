import { prisma } from '../prisma/client';
import { NotFoundError, ValidationError } from '../utils/errors';
import { isValidName, isValidDescription } from '../utils/validators';

export class ProfileService {
    static async getAllProfiles() {
        return await prisma.profile.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    static async getProfileById(id: string) {
        const profile = await prisma.profile.findUnique({ where: { id } });
        if (!profile) throw new NotFoundError('Perfil no encontrado');
        return profile;
    }

    static async createProfile(name: string, description: string) {
        if (!isValidName(name)) {
            throw new ValidationError('Nombre inválido');
        }
        if (!isValidDescription(description)) {
            throw new ValidationError('Descripción inválida');
        }
        const existing = await prisma.profile.findUnique({ where: { name } });
        if (existing) throw new ValidationError('El perfil ya existe');

        return await prisma.profile.create({
            data: { name, description },
        });
    }

    static async updateProfile(id: string, name?: string, description?: string) {
        const profile = await prisma.profile.findUnique({ where: { id } });
        if (!profile) throw new NotFoundError('Perfil no encontrado');

        const data: any = {};
        if (name && isValidName(name)) data.name = name;
        if (description && isValidDescription(description)) data.description = description;

        return await prisma.profile.update({ where: { id }, data });
    }

    static async deleteProfile(id: string) {
        const profile = await prisma.profile.findUnique({ where: { id } });
        if (!profile) throw new NotFoundError('Perfil no encontrado');

        if (['ADMIN', 'SOPORTE', 'CLIENTE'].includes(profile.name)) {
            throw new ValidationError('No se pueden eliminar perfiles por defecto');
        }

        return await prisma.profile.delete({ where: { id } });
    }
}