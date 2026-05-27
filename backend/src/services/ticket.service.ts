import { prisma } from '../prisma/client';
import { NotFoundError, ValidationError, UnauthorizedError } from '../utils/errors';
import { validateTicketStatus, validateTicketPriority } from '../utils/validators';

export class TicketService {
    /**
     * Obtener todos los tickets con filtros opcionales
     */
    static async getAllTickets(
        userId?: string,
        status?: string,
        priority?: string
    ) {
        const where: any = {};

        // Si viene userId, filtrar solo tickets de ese usuario
        if (userId) {
            where.userId = userId;
        }

        // Filtrar por estado
        if (status && validateTicketStatus(status)) {
            where.status = status.toUpperCase() as any;
        }

        // Filtrar por prioridad
        if (priority && validateTicketPriority(priority)) {
            where.priority = priority.toUpperCase() as any;
        }

        const tickets = await prisma.ticket.findMany({
            where,
            include: {
                creator: { select: { id: true, name: true, email: true } },
                assignee: { select: { id: true, name: true, email: true } },
                comments: { include: { user: { select: { id: true, name: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return tickets;
    }

    /**
     * Obtener un ticket específico por ID
     */
    static async getTicketById(id: string) {
        const ticket = await prisma.ticket.findUnique({
            where: { id },
            include: {
                creator: { select: { id: true, name: true, email: true } },
                assignee: { select: { id: true, name: true, email: true } },
                comments: {
                    include: { user: { select: { id: true, name: true } } },
                    orderBy: { createdAt: 'desc' },
                },
                assignments: { include: { user: { select: { id: true, name: true } } } },
            },
        });

        if (!ticket) {
            throw new NotFoundError('Ticket no encontrado');
        }

        return ticket;
    }

    /**
     * Crear un nuevo ticket
     */
    static async createTicket(
        title: string,
        description: string,
        priority: string,
        userId: string
    ) {
        // Validar inputs
        if (!title || title.trim().length < 5) {
            throw new ValidationError('El título debe tener al menos 5 caracteres');
        }

        if (!description || description.trim().length < 10) {
            throw new ValidationError('La descripción debe tener al menos 10 caracteres');
        }

        if (description.length > 1000) {
            throw new ValidationError('La descripción no puede exceder 1000 caracteres');
        }

        if (!validateTicketPriority(priority)) {
            throw new ValidationError('Prioridad inválida (LOW, MEDIUM, HIGH)');
        }

        // Validar que usuario existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }

        // Crear ticket
        const ticket = await prisma.ticket.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                priority: priority.toUpperCase() as any,
                status: 'OPEN',
                userId,
            },
            include: {
                creator: { select: { id: true, name: true, email: true } },
                assignee: true,
                comments: true,
            },
        });

        return ticket;
    }

    /**
     * Actualizar estado de un ticket
     * Solo SOPORTE puede hacerlo
     */
    static async updateTicketStatus(
        ticketId: string,
        newStatus: string,
        userProfileId: string
    ) {
        // Validar que es SOPORTE o ADMIN
        if (!['SOPORTE', 'ADMIN'].includes(userProfileId)) {
            throw new UnauthorizedError('Solo SOPORTE puede cambiar el estado del ticket');
        }

        // Validar estado
        if (!validateTicketStatus(newStatus)) {
            throw new ValidationError('Estado inválido (OPEN, IN_PROGRESS, RESOLVED, REJECTED)');
        }

        // Verificar que ticket existe
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId },
        });

        if (!ticket) {
            throw new NotFoundError('Ticket no encontrado');
        }

        // Actualizar status
        const updated = await prisma.ticket.update({
            where: { id: ticketId },
            data: {
                status: newStatus.toUpperCase() as any,
            },
            include: {
                creator: { select: { id: true, name: true, email: true } },
                assignee: { select: { id: true, name: true, email: true } },
                comments: true,
            },
        });

        return updated;
    }

    /**
     * Asignar un ticket a un usuario SOPORTE
     */
    static async assignTicket(ticketId: string, supportUserId: string) {
        // Verificar que ticket existe
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId },
        });

        if (!ticket) {
            throw new NotFoundError('Ticket no encontrado');
        }

        // Verificar que usuario existe y es SOPORTE
        const user = await prisma.user.findUnique({
            where: { id: supportUserId },
            include: { profile: true },
        });

        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }

        if (user.profile.name !== 'SOPORTE' && user.profile.name !== 'ADMIN') {
            throw new ValidationError('Solo se puede asignar a usuarios SOPORTE o ADMIN');
        }

        // Actualizar assigned_to en ticket
        const updated = await prisma.ticket.update({
            where: { id: ticketId },
            data: {
                assignedTo: supportUserId,
            },
        });

        // Crear registro en assignments (si no existe)
        try {
            await prisma.assignment.create({
                data: {
                    userId: supportUserId,
                    ticketId,
                },
            });
        } catch (error) {
            // Si ya existe, ignorar
        }

        return updated;
    }

    /**
     * Agregar comentario a un ticket
     */
    static async addComment(ticketId: string, content: string, userId: string) {
        // Validar inputs
        if (!content || content.trim().length < 1) {
            throw new ValidationError('El comentario no puede estar vacío');
        }

        // Verificar que ticket existe
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId },
        });

        if (!ticket) {
            throw new NotFoundError('Ticket no encontrado');
        }

        // Crear comentario
        const comment = await prisma.comment.create({
            data: {
                content: content.trim(),
                userId,
                ticketId,
            },
            include: {
                user: { select: { id: true, name: true } },
            },
        });

        return comment;
    }
}