import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from '../models/drink.model'; // Crée un modèle Drink correspondant à ton backend
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  private apiUrl = environment.apiUrlDrink + '/drinks';

  constructor(private http: HttpClient) {}

  // Create a new drink
  createDrink(drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(`${this.apiUrl}`, drink);
  }

  // Update an existing drink
  updateDrink(id: number, drink: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${this.apiUrl}/${id}`, drink);
  }

  // Delete a drink
  deleteDrink(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get a drink by its ID
  getDrinkById(id: number): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${id}`);
  }

  // Get all drinks
  getAllDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.apiUrl}`);
  }

  // Get all drinks of a specific user
  getDrinksByUserId(userId: number): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.apiUrl}/user/${userId}`);
  }
}
