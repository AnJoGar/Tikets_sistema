import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tickets',
        loadComponent: () => import('./pages/tickets/tickets').then(m => m.TicketsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tickets/:id',
        loadComponent: () => import('./pages/ticket-detail/ticket-detail').then(m => m.TicketDetailComponent),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '/dashboard' }
];