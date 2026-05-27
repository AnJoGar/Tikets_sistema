import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss'
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  loading = true;
  error = '';
  createForm: FormGroup;
  showCreateForm = false;
  submitted = false;

  constructor(
    private ticketService: TicketService,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['MEDIUM', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.loading = true;
    this.ticketService.getTickets().subscribe({
      next: (response: any) => {
        this.tickets = response.data;
        this.filteredTickets = this.tickets;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error cargando tickets';
        this.loading = false;
      }
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    const { title, description, priority } = this.createForm.value;
    this.ticketService.createTicket(title, description, priority).subscribe({
      next: () => {
        this.createForm.reset();
        this.submitted = false;
        this.showCreateForm = false;
        this.loadTickets();
      },
      error: (error) => {
        this.error = error.error?.message || 'Error creando ticket';
      }
    });
  }

  filterByStatus(status: string) {
    if (status === 'ALL') {
      this.filteredTickets = this.tickets;
    } else {
      this.filteredTickets = this.tickets.filter(t => t.status === status);
    }
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