import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.scss'
})
export class TicketListComponent {
  @Input() tickets: Ticket[] = [];
  @Input() loading = false;

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