import { hashPassword, comparePassword, validatePasswordStrength } from '../../src/utils/password.utils';

describe('Password Utils', () => {
    describe('hashPassword', () => {
        it('debería hashear una contraseña', async () => {
            const password = 'Password123';
            const hash = await hashPassword(password);

            expect(hash).toBeDefined();
            expect(hash).not.toBe(password);
            expect(hash.length).toBeGreaterThan(0);
        });

        it('debería generar hashes diferentes para la misma contraseña', async () => {
            const password = 'Password123';
            const hash1 = await hashPassword(password);
            const hash2 = await hashPassword(password);

            expect(hash1).not.toBe(hash2);
        });
    });

    describe('comparePassword', () => {
        it('debería validar una contraseña correcta', async () => {
            const password = 'Password123';
            const hash = await hashPassword(password);
            const isValid = await comparePassword(password, hash);

            expect(isValid).toBe(true);
        });

        it('debería rechazar una contraseña incorrecta', async () => {
            const password = 'Password123';
            const wrongPassword = 'WrongPassword456';
            const hash = await hashPassword(password);
            const isValid = await comparePassword(wrongPassword, hash);

            expect(isValid).toBe(false);
        });

        it('debería ser case-sensitive', async () => {
            const password = 'Password123';
            const hash = await hashPassword(password);
            const isValid = await comparePassword('password123', hash);

            expect(isValid).toBe(false);
        });
    });

    describe('validatePasswordStrength', () => {
        it('debería aceptar una contraseña fuerte', () => {
            const result = validatePasswordStrength('StrongPass123');

            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('debería rechazar contraseña muy corta', () => {
            const result = validatePasswordStrength('Pass1');

            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('La contraseña debe tener al menos 8 caracteres');
        });

        it('debería rechazar contraseña sin mayúscula', () => {
            const result = validatePasswordStrength('password123');

            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('La contraseña debe contener al menos una mayúscula');
        });

        it('debería rechazar contraseña sin número', () => {
            const result = validatePasswordStrength('PasswordABC');

            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('La contraseña debe contener al menos un número');
        });

        it('debería retornar múltiples errores', () => {
            const result = validatePasswordStrength('pass');

            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(1);
        });
    });
});