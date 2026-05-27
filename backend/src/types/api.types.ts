/**
 * Tipos globales para la API
 */

export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
    code?: number;
}

export interface PaginatedResponse<T> extends ApiResponse {
    data?: {
        items: T[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}

export interface JwtPayload {
    id: string;
    email: string;
    profileId: string;
    iat?: number;
    exp?: number;
}

export interface AuthenticatedRequest {
    user?: JwtPayload;
}
