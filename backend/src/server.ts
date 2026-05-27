import app from './app';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Prisma
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ==================== FUNCIONES ====================

async function connectDatabase(): Promise<void> {
    try {
        await prisma.$connect();
        console.log('✅ BD conectada correctamente');
    } catch (error) {
        console.error('❌ Error conectando a la BD:', error);
        process.exit(1);
    }
}

async function startServer(): Promise<void> {
    try {
        // Conectar a la BD
        await connectDatabase();

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log('\n═══════════════════════════════════════════════════════');
            console.log(`✅ Servidor corriendo en puerto ${PORT}`);
            console.log(`🌍 Ambiente: ${NODE_ENV}`);
            console.log('═══════════════════════════════════════════════════════\n');
        });
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
}

// ==================== GRACEFUL SHUTDOWN ====================

async function gracefulShutdown(): Promise<void> {
    console.log('\n📛 Cerrando servidor...');

    try {
        await prisma.$disconnect();
        console.log('✅ BD desconectada');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error durante shutdown:', error);
        process.exit(1);
    }
}

// Escuchar señales de cierre
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Manejo de excepciones no capturadas
process.on('uncaughtException', (error) => {
    console.error('❌ Excepción no capturada:', error);
    gracefulShutdown();
});

// Iniciar servidor
startServer();

export { prisma };