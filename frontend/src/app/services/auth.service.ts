import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AuthResponse, User } from '../models/auth.models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser$: Observable<User | null>;

    constructor(private apiService: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User | null>(
            typeof window !== 'undefined' ? this.getUserFromStorage() : null
        );
        this.currentUser$ = this.currentUserSubject.asObservable();
    }
    login(email: string, password: string): Observable<AuthResponse> {
        return this.apiService.post('/auth/login', { email, password }).pipe(
            tap((response: any) => {
                if (response.data && typeof window !== 'undefined') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    this.currentUserSubject.next(response.data.user);
                }
            })
        );
    }

    register(name: string, email: string, password: string, profileId: string): Observable<AuthResponse> {
        return this.apiService.post('/auth/register', { name, email, password, profileId }).pipe(
            tap((response: any) => {
                if (response.data && typeof window !== 'undefined') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    this.currentUserSubject.next(response.data.user);
                }
            })
        );
    }

    logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        if (typeof window === 'undefined') {
            return null;
        }
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    private getUserFromStorage(): User | null {
        if (typeof window === 'undefined') {
            return null;
        }
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}