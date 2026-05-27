import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  error = '';
  currentUser: any;

  constructor(
    private authService: AuthService,
    private ticketService: TicketService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (response: any) => {
        this.tickets = response.data.slice(0, 5);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error cargando tickets';
        this.loading = false;
      }
    });
  }

  getStatusBadge(status: string): string {
    const badges: any = {
      'OPEN': 'badge-primary',
      'IN_PROGRESS': 'badge-warning',
      'RESOLVED': 'badge-success',
      'REJECTED': 'badge-danger'
    };
    return badges[status] || 'badge-secondary';
  }

  getPriorityBadge(priority: string): string {
    const badges: any = {
      'LOW': 'badge-info',
      'MEDIUM': 'badge-warning',
      'HIGH': 'badge-danger'
    };
    return badges[priority] || 'badge-secondary';
  }
}