// src/app/services/core/dessert.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Dessert } from '../models/dessert.model';

@Injectable({
  providedIn: 'root',
})
export class DessertService {
  private apiUrl = `${environment.apiBaseUrl}/desserts`;

  constructor(private http: HttpClient) {}

  // -------------------- Création --------------------
  createDessert(dessert: Dessert): Observable<Dessert> {
    return this.http.post<Dessert>(`${this.apiUrl}`, dessert);
  }

  // -------------------- Mise à jour --------------------
  updateDessert(id: number, dessert: Dessert): Observable<Dessert> {
    return this.http.put<Dessert>(`${this.apiUrl}/${id}`, dessert);
  }

  // -------------------- Suppression --------------------
  deleteDessert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // -------------------- Récupérer un dessert --------------------
  getDessert(id: number): Observable<Dessert> {
    return this.http.get<Dessert>(`${this.apiUrl}/${id}`);
  }

  // -------------------- Récupérer tous les desserts --------------------
  getAllDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(`${this.apiUrl}`);
  }

  // -------------------- Récupérer desserts par utilisateur --------------------
  getDessertsByUser(userId: number): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(`${this.apiUrl}/user/${userId}`);
  }
}
