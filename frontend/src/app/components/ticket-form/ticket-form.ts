import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.scss'
})
export class TicketFormComponent {
  @Output() formSubmit = new EventEmitter<any>();

  ticketForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.ticketForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['MEDIUM', Validators.required]
    });
  }

  get f() {
    return this.ticketForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.ticketForm.invalid) {
      return;
    }

    this.formSubmit.emit(this.ticketForm.value);
    this.ticketForm.reset();
    this.submitted = false;
  }
}