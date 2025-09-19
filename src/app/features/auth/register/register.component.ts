import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (res) => {
          this.successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
          this.isSubmitting = false;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          console.error('❌ Erreur d’inscription :', err);
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          this.isSubmitting = false;
        }
      });
    }
  }

  test(): void {
    console.log('✅ Bouton cliqué');
    alert('Inscription simulée ! Redirection vers la connexion...');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
