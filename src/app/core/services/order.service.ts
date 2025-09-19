import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'https://node-eemi.vercel.app/api/orders';

  constructor(private http: HttpClient) {}

  getOrdersForUser(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/${userId}`);
  }
}
