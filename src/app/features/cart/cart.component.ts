import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  errorItems: string[] = [];
  total = 0;

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const ids = this.cartService.getCartIds();

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        const matchedProducts = ids
          .map(id => products.find(p => p.id === id))
          .filter((p): p is Product => !!p && p.isAvailable);

        this.cartItems = matchedProducts;

        this.errorItems = ids.filter(id => {
          const product = products.find(p => p.id === id);
          return !product || !product.isAvailable;
        });

        this.total = this.cartItems.reduce((sum, p) => sum + p.price, 0);
      },
      error: () => {
        console.error('Erreur lors du chargement des produits');
      }
    });
  }

  remove(id: string): void {
    this.cartService.removeFromCart(id);
    this.ngOnInit(); 
  }

  canOrder(): boolean {
return this.cartItems.length > 0 && this.authService.isLoggedIn();
  }

  getImageUrl(product: Product): string {
return product.imageUrl?.trim() ? product.imageUrl : 'assets/images/default-burger.jpg';
}

}
