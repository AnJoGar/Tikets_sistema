import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Ticket } from '../models/ticket.model';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    constructor(private apiService: ApiService) { }

    getTickets(filters?: any): Observable<any> {
        let endpoint = '/tickets';
        if (filters) {
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.priority) params.append('priority', filters.priority);
            if (params.toString()) {
                endpoint += '?' + params.toString();
            }
        }
        return this.apiService.get<Ticket[]>(endpoint);
    }

    getTicketById(id: string): Observable<Ticket> {
        return this.apiService.get<Ticket>(`/tickets/${id}`);
    }

    createTicket(title: string, description: string, priority: string): Observable<Ticket> {
        return this.apiService.post<Ticket>('/tickets', { title, description, priority });
    }

    updateTicketStatus(id: string, status: string): Observable<Ticket> {
        return this.apiService.patch<Ticket>(`/tickets/${id}/status`, { status });
    }

    addComment(ticketId: string, content: string): Observable<any> {
        return this.apiService.post(`/tickets/${ticketId}/comments`, { content });
    }
}