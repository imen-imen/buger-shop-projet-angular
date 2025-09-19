import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  private productService = inject(ProductService);
  private cartService = inject(CartService); // ✅ Ajouté ici

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les produits';
        this.isLoading = false;
      }
    });
  }

  getImageUrl(product: Product): string {
return product.imageUrl?.trim() ? product.imageUrl : 'assets/images/default-burger.jpg';
  }

  addToCart(id: string): void {
    this.cartService.addToCart(id);
    console.log('Produit ajouté au panier :', id);
  }
}
