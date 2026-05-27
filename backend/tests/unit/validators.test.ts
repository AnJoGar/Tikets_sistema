import {
    validateEmail,
    validateTicketStatus,
    validateTicketPriority,
    isValidName,
    isValidDescription,
} from '../../src/utils/validators';

describe('Validators', () => {
    describe('validateEmail', () => {
        it('debería validar un email correcto', () => {
            expect(validateEmail('user@example.com')).toBe(true);
            expect(validateEmail('test.user@domain.co.uk')).toBe(true);
        });

        it('debería rechazar emails inválidos', () => {
            expect(validateEmail('invalid')).toBe(false);
            expect(validateEmail('user@')).toBe(false);
            expect(validateEmail('@example.com')).toBe(false);
            expect(validateEmail('user @example.com')).toBe(false);
        });
    });

    describe('validateTicketStatus', () => {
        it('debería aceptar estados válidos', () => {
            expect(validateTicketStatus('OPEN')).toBe(true);
            expect(validateTicketStatus('IN_PROGRESS')).toBe(true);
            expect(validateTicketStatus('RESOLVED')).toBe(true);
            expect(validateTicketStatus('REJECTED')).toBe(true);
        });

        it('debería ser case-insensitive', () => {
            expect(validateTicketStatus('open')).toBe(true);
            expect(validateTicketStatus('In_Progress')).toBe(true);
        });

        it('debería rechazar estados inválidos', () => {
            expect(validateTicketStatus('PENDING')).toBe(false);
            expect(validateTicketStatus('CLOSED')).toBe(false);
            expect(validateTicketStatus('INVALID')).toBe(false);
        });
    });

    describe('validateTicketPriority', () => {
        it('debería aceptar prioridades válidas', () => {
            expect(validateTicketPriority('LOW')).toBe(true);
            expect(validateTicketPriority('MEDIUM')).toBe(true);
            expect(validateTicketPriority('HIGH')).toBe(true);
        });

        it('debería ser case-insensitive', () => {
            expect(validateTicketPriority('low')).toBe(true);
            expect(validateTicketPriority('Medium')).toBe(true);
        });

        it('debería rechazar prioridades inválidas', () => {
            expect(validateTicketPriority('URGENT')).toBe(false);
            expect(validateTicketPriority('NORMAL')).toBe(false);
        });
    });

    describe('isValidName', () => {
        it('debería aceptar nombres válidos', () => {
            expect(isValidName('Juan')).toBe(true);
            expect(isValidName('María García López')).toBe(true);
        });

        it('debería rechazar nombres muy cortos', () => {
            expect(isValidName('A')).toBe(false);
            expect(isValidName('')).toBe(false);
        });

        it('debería rechazar nombres muy largos', () => {
            const longName = 'A'.repeat(101);
            expect(isValidName(longName)).toBe(false);
        });
    });

    describe('isValidDescription', () => {
        it('debería aceptar descripciones válidas', () => {
            expect(isValidDescription('Una descripción válida')).toBe(true);
            expect(isValidDescription('Descripción con más caracteres')).toBe(true);
        });

        it('debería rechazar descripciones vacías', () => {
            expect(isValidDescription('')).toBe(false);
            expect(isValidDescription('   ')).toBe(false);
        });

        it('debería rechazar descripciones muy largas', () => {
            const longDesc = 'A'.repeat(1001);
            expect(isValidDescription(longDesc)).toBe(false);
        });
    });
});