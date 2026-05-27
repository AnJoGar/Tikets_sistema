import { generateToken, verifyToken, extractToken } from '../../src/utils/jwt.utils';

describe('JWT Utils', () => {
    const payload = {
        id: 'user123',
        email: 'test@example.com',
        profileId: 'profile456',
    };

    describe('generateToken', () => {
        it('debería generar un token válido', () => {
            const token = generateToken(payload);
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3); // JWT tiene 3 partes
        });

        it('debería generar tokens diferentes cada vez', () => {
            const token1 = generateToken(payload);
            const token2 = generateToken(payload);
            expect(token1).not.toBe(token2);
        });
    });

    describe('verifyToken', () => {
        it('debería decodificar un token válido', () => {
            const token = generateToken(payload);
            const decoded = verifyToken(token);

            expect(decoded.id).toBe(payload.id);
            expect(decoded.email).toBe(payload.email);
            expect(decoded.profileId).toBe(payload.profileId);
        });

        it('debería lanzar error con token inválido', () => {
            expect(() => {
                verifyToken('token.invalido.abc');
            }).toThrow('Token inválido o expirado');
        });

        it('debería lanzar error con token vacio', () => {
            expect(() => {
                verifyToken('');
            }).toThrow();
        });
    });

    describe('extractToken', () => {
        it('debería extraer token de header Bearer válido', () => {
            const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test';
            const token = extractToken(authHeader);

            expect(token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test');
        });

        it('debería retornar null si no hay header', () => {
            const token = extractToken(undefined);
            expect(token).toBeNull();
        });

        it('debería retornar null si header no es Bearer', () => {
            const token = extractToken('Basic abc123');
            expect(token).toBeNull();
        });

        it('debería retornar null si header tiene formato incorrecto', () => {
            const token = extractToken('Bearer');
            expect(token).toBeNull();
        });
    });
});