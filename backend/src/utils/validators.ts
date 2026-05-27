/**
 * Validadores de datos de entrada
 */

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validateUUID(uuid: string): boolean {
    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

export function validateTicketStatus(status: string): boolean {
    const validStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'];
    return validStatuses.includes(status.toUpperCase());
}

export function validateTicketPriority(priority: string): boolean {
    const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
    return validPriorities.includes(priority.toUpperCase());
}

export function validateProfileName(name: string): boolean {
    const validProfiles = ['ADMIN', 'SOPORTE', 'CLIENTE'];
    return validProfiles.includes(name.toUpperCase());
}

export function isEmptyString(value: string): boolean {
    return !value || value.trim().length === 0;
}

export function isValidName(name: string): boolean {
    return !isEmptyString(name) && name.length >= 2 && name.length <= 100;
}

export function isValidDescription(description: string): boolean {
    return !isEmptyString(description) && description.length <= 1000;
}