import { User } from './user.model';

export interface Drink {
  id?: number;
  name: string;
  price: number;
  image: string;
  user?: User; // Optionnel si tu veux juste passer l'ID utilisateur
}
