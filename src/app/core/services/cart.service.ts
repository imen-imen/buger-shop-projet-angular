import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartIds: string[] = [];

  getCartIds(): string[] {
    return this.cartIds;
  }

  addToCart(id: string): void {
    this.cartIds.push(id);
  }

  removeFromCart(id: string): void {
    this.cartIds = this.cartIds.filter(itemId => itemId !== id);
  }

  clearCart(): void {
    this.cartIds = [];
  }
}
