import { Request, Response, NextFunction } from 'express';
import { TicketService } from '../services/ticket.service';
import { ApiResponse } from '../types/api.types';

export class TicketController {
    /**
     * GET /api/tickets
     */
    static async getAllTickets(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, status, priority } = req.query;

            const tickets = await TicketService.getAllTickets(
                userId as string | undefined,
                status as string | undefined,
                priority as string | undefined
            );

            res.status(200).json({
                status: 'success',
                data: tickets,
                message: 'Tickets obtenidos correctamente',
            } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/tickets/:id
     */
    static async getTicketById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const ticket = await TicketService.getTicketById(id);

            res.status(200).json({
                status: 'success',
                data: ticket,
            } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/tickets
     */
    static async createTicket(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, description, priority } = req.body;
            const userId = req.user?.id;

            if (!userId) {
                res.status(401).json({
                    status: 'error',
                    message: 'No autenticado',
                    code: 401,
                } as ApiResponse);
                return;
            }

            if (!title || !description || !priority) {
                res.status(400).json({
                    status: 'error',
                    message: 'Todos los campos son requeridos: title, description, priority',
                    code: 400,
                } as ApiResponse);
                return;
            }

            const ticket = await TicketService.createTicket(
                title,
                description,
                priority,
                userId
            );

            res.status(201).json({
                status: 'success',
                data: ticket,
                message: 'Ticket creado exitosamente',
            } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    /**
     * PATCH /api/tickets/:id/status
     */
    static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const profileId = req.user?.profileId;

            if (!profileId) {
                res.status(401).json({
                    status: 'error',
                    message: 'No autenticado',
                    code: 401,
                } as ApiResponse);
                return;
            }

            if (!status) {
                res.status(400).json({
                    status: 'error',
                    message: 'El estado (status) es requerido',
                    code: 400,
                } as ApiResponse);
                return;
            }

            const ticket = await TicketService.updateTicketStatus(id, status, profileId);

            res.status(200).json({
                status: 'success',
                data: ticket,
                message: 'Estado del ticket actualizado',
            } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    /**
     * PATCH /api/tickets/:id/assign
     */
    static async assignTicket(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { supportUserId } = req.body;

            if (!supportUserId) {
                res.status(400).json({
                    status: 'error',
                    message: 'El supportUserId es requerido',
                    code: 400,
                } as ApiResponse);
                return;
            }

            const ticket = await TicketService.assignTicket(id, supportUserId);

            res.status(200).json({
                status: 'success',
                data: ticket,
                message: 'Ticket asignado correctamente',
            } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/tickets/:id/comments
     */
    static async addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const userId = req.user?.id;

            if (!userId) {
                res.status(401).json({
                    status: 'error',
                    message: 'No autenticado',
                    code: 401,
                } as ApiResponse);
                return;
            }

            if (!content) {
                res.status(400).json({
                    status: 'error',
                    message: 'El contenido del comentario es requerido',
                    code: 400,
                } as ApiResponse);
                return;
            }

            const comment = await TicketService.addComment(id, content, userId);

            res.status(201).json({
                status: 'success',
                data: comment,
                message: 'Comentario agregado',
            } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }
}