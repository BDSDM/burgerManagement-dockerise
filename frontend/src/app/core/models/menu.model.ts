import { User } from './user.model';

// src/app/core/models/menu.model.ts
export interface Menu {
  id?: number;
  burger: string;
  drink?: string;
  dessert?: string;
  user?: User;
}
