import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName = 'Imen';
  isLoading = true;
  orders: Order[] = [];

  trackByDate(index: number, order: Order): string {
  return order.date;
}


  ngOnInit(): void {
    setTimeout(() => {
      this.orders = [
        {
          date: '2025-09-15',
          items: [
            { name: 'Burger classique', price: 7.9, imageUrl: 'burger1.jpg' },
            { name: 'Burger veggie', price: 7.9, imageUrl: 'burger2.jpg' }
          ]
        },
        {
          date: '2025-09-10',
          items: [
            { name: 'Burger bacon', price: 8.5, imageUrl: 'burger3.jpg' }
          ]
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  getImageUrl(url: string): string {
    return url?.trim()
      ? url.startsWith('http') ? url : `/assets/burgers/${url}`
      : '/assets/images/default-burger.jpg';
  }
}
