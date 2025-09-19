import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product: Product | null = null;
  otherProducts: Product[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Produit introuvable';
      this.isLoading = false;
      return;
    }

    // Charger le produit principal
    this.productService.getProductById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('❌ Erreur chargement produit principal :', err);
        this.errorMessage = 'Produit introuvable';
        this.isLoading = false;
      }
    });

    // Charger les autres produits
    this.productService.getAllProducts().subscribe({
      next: (data) => {
this.otherProducts = data.filter(p => p.id.toString() !== id).slice(0, 4);
      },
      error: (err) => {
        console.error('❌ Erreur chargement autres produits :', err);
      }
    });
  }

  getImageUrl(url: string | undefined): string {
    if (!url || !url.trim()) {
      return '/assets/images/default/default-burger.jpg';
    }
    return url.startsWith('http')
      ? url
      : `/assets/burgers/${url}`;
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = '/assets/images/default/default-burger.jpg';
  }

  addToCart(product: Product): void {
    if (product?.id) {
      this.cartService.addToCart(product.id.toString());
      alert(`✅ ${product.name} a été ajouté au panier !`);
    }
  }
}
