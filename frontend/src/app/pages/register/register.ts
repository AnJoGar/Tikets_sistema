import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  profiles: Profile[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      profileId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.profileService.getProfiles().subscribe({
      next: (response: any) => {
        this.profiles = response.data;
      },
      error: () => {
        this.error = 'Error cargando perfiles';
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { name, email, password, profileId } = this.registerForm.value;
    this.authService.register(name, email, password, profileId).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = error.error?.message || 'Error en el registro';
        this.loading = false;
      }
    });
  }
}