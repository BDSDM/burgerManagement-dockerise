import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

export interface Burger {
  id: number;
  name: string;
  price: number;
  image: string;
  user: User; // Important !
}

@Injectable({
  providedIn: 'root',
})
export class BurgerService {
  private apiUrl = `${environment.apiUrlBurger}/burgers`;

  constructor(private http: HttpClient) {}

  // Plus besoin de passer le token, l'interceptor s'en charge
  getAllBurgers(): Observable<Burger[]> {
    return this.http.get<Burger[]>(this.apiUrl);
  }

  getBurgerById(id: number): Observable<Burger> {
    return this.http.get<Burger>(`${this.apiUrl}/${id}`);
  }

  createBurger(burger: Burger): Observable<Burger> {
    return this.http.post<Burger>(this.apiUrl, burger);
  }

  updateBurger(id: number, burger: Burger): Observable<Burger> {
    return this.http.put<Burger>(`${this.apiUrl}/${id}`, burger);
  }

  deleteBurger(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
