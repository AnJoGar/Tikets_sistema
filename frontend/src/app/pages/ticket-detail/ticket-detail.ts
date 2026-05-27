import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { Ticket, Comment } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss'
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket | null = null;
  loading = true;
  error = '';
  commentForm: FormGroup;
  submitted = false;
  ticketId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private formBuilder: FormBuilder
  ) {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ticketId = params['id'];
      this.loadTicket();
    });
  }

  loadTicket() {
    this.loading = true;
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (response: any) => {
        this.ticket = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error cargando ticket';
        this.loading = false;
      }
    });
  }

  get f() {
    return this.commentForm.controls;
  }

  onSubmitComment() {
    this.submitted = true;

    if (this.commentForm.invalid) {
      return;
    }

    const content = this.f['content'].value;
    this.ticketService.addComment(this.ticketId, content).subscribe({
      next: () => {
        this.commentForm.reset();
        this.submitted = false;
        this.loadTicket();
      },
      error: (error) => {
        this.error = error.error?.message || 'Error agregando comentario';
      }
    });
  }

  updateStatus(newStatus: string) {
    this.ticketService.updateTicketStatus(this.ticketId, newStatus).subscribe({
      next: () => {
        this.loadTicket();
      },
      error: (error) => {
        this.error = error.error?.message || 'Error actualizando estado';
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

  goBack() {
    this.router.navigate(['/tickets']);
  }
}