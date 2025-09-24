import { User } from './user.model';

export interface Dessert {
  id?: number;
  name: string;
  price: number;
  image: string;
  user?: User; // optionnel si tu récupères l'utilisateur côté backend
}
