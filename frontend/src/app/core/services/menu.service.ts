// src/app/core/services/menu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = `${environment.apiUrlMenu}/menus`;

  constructor(private http: HttpClient) {}
  // 🔹 Mettre à jour un menu existant
  updateMenu(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, menu);
  }

  // Ajouter un menu
  addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  // Supprimer un menu par ID
  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer un menu par ID
  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }

  // Récupérer tous les menus
  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  // Récupérer les menus d’un utilisateur
  getMenusByUser(userId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/user/${userId}`);
  }
}
