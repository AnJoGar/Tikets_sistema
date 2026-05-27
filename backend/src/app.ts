import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import ticketRoutes from './routes/ticket.routes';
import userRoutes from './routes/user.routes';
import profileRoutes from './routes/profile.routes';

// Tipos
export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
    code?: number;
}

// Crear instancia de Express
const app: Express = express();

// ==================== MIDDLEWARE ====================

// CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '*',
    credentials: true,
}));

// Parseo de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logger simple
app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// ==================== RUTAS ====================

// Health check
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'success', message: 'Servidor funcionando correctamente' });
});

// Ruta base
app.get('/', (_req: Request, res: Response) => {
    const response: ApiResponse = {
        status: 'success',
        message: 'Plataforma de Gestión de Tickets - API v1.0',
        data: {
            version: '1.0.0',
            endpoints: {
                auth: '/api/auth',
                tickets: '/api/tickets',
                users: '/api/users',
                profiles: '/api/profiles',
            }
        }
    };
    res.json(response);
});

// ==================== RUTAS DE API ====================

// Autenticación
app.use('/api/auth', authRoutes);

// Tickets
app.use('/api/tickets', ticketRoutes);

// Usuarios
app.use('/api/users', userRoutes);

// Perfiles
app.use('/api/profiles', profileRoutes);

// ==================== ERROR HANDLING ====================

// Ruta 404
app.use((_req: Request, res: Response) => {
    const response: ApiResponse = {
        status: 'error',
        message: 'Ruta no encontrada',
        code: 404
    };
    res.status(404).json(response);
});

// Error middleware centralizado
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    const response: ApiResponse = {
        status: 'error',
        message,
        code: statusCode,
        ...(process.env.NODE_ENV === 'development' && { error: err.stack })
    };

    res.status(statusCode).json(response);
});

export default app;