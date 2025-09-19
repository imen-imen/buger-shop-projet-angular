import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://node-eemi.vercel.app/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ items: Product[] }>(this.apiUrl).pipe(
      map(response => response.items)
    );
  }
  getProductById(id: string): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${id}`);
}

getAllProducts(): Observable<Product[]> {
  return this.getProducts();
}


}
