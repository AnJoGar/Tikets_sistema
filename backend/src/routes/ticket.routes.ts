import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import { authenticateToken } from '../middleware/auth.middelware';

const router = Router();

// Middleware de autenticación para todas las rutas
router.use(authenticateToken);

/**
 * GET /api/tickets
 * Obtener todos los tickets (con filtros opcionales)
 */
router.get('/', TicketController.getAllTickets);

/**
 * GET /api/tickets/:id
 * Obtener un ticket específico
 */
router.get('/:id', TicketController.getTicketById);

/**
 * POST /api/tickets
 * Crear un nuevo ticket
 */
router.post('/', TicketController.createTicket);

/**
 * PATCH /api/tickets/:id/status
 * Cambiar el estado del ticket (solo SOPORTE/ADMIN)
 */
router.patch('/:id/status', TicketController.updateStatus);

/**
 * PATCH /api/tickets/:id/assign
 * Asignar un ticket a un usuario SOPORTE
 */
router.patch('/:id/assign', TicketController.assignTicket);

/**
 * POST /api/tickets/:id/comments
 * Agregar comentario a un ticket
 */
router.post('/:id/comments', TicketController.addComment);

export default router;