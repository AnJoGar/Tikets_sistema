import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashear contraseña con bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Comparar contraseña con hash
 */
export async function comparePassword(
    password: string,
    hash: string
): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

/**
 * Validar fortaleza de contraseña
 * Debe tener: al menos 8 caracteres, 1 mayúscula, 1 número
 */
export function validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una mayúscula');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('La contraseña debe contener al menos un número');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}