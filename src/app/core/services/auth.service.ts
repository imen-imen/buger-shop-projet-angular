import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://node-eemi.vercel.app/api';

  constructor(private http: HttpClient) {}

  // 🔐 Login
  login(data: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, data).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  // 📝 Register
  register(data: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/register`, data).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  // 👤 Get profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`);
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🔄 Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
