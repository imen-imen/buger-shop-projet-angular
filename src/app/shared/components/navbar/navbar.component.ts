import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'app/core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartService = inject(CartService);
  router = inject(Router);

  isLoggedIn = false;

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.checkLoginStatus();
    this.router.navigate(['/login']);
  }
}
