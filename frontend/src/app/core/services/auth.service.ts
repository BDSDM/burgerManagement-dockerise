import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from 'src/app/features/confirm-logout-dialog/confirm-logout-dialog.component';
import { User } from '../models/user.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // ✅ utilise l'environnement

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string; refreshToken: string }>(
      `${this.apiUrl}/login`,
      { email, password }
    );
  }

  register(user: User): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      responseType: 'text',
    });
  }

  saveToken(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  loGout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    });
  }

  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj.email || payloadObj.sub || null;
    } catch (e) {
      console.error('Erreur lors du décodage du token :', e);
      return null;
    }
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj.name || null;
    } catch (e) {
      console.error('Erreur lors du décodage du token :', e);
      return null;
    }
  }

  getUserId(): number {
    const token = this.getToken();
    if (!token) return 0;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(
        payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
      );
      const payload = JSON.parse(payloadJson);
      return payload.id || payload.userId || 0;
    } catch (error) {
      console.error('Erreur lors du décodage du token JWT', error);
      return 0;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      console.error('Erreur lors du décodage du token :', e);
      return null;
    }
  }
}
