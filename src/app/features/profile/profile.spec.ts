import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private userService = inject(UserService);

  user: User | null = null;
  errorMessage = '';
  isLoading = true;

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger le profil';
        this.isLoading = false;
      }
    });
  }

  getImageUrl(image: string): string {
    return image?.trim()
      ? `/assets/images/users/${image}`
      : `/assets/images/default-avatar.png`;
  }
}
