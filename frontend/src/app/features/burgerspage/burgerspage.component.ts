import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Burger, BurgerService } from 'src/app/core/services/burger.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { Menu } from 'src/app/core/models/menu.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-burgerspage',
  templateUrl: './burgerspage.component.html',
  styleUrls: ['./burgerspage.component.css'],
})
export class BurgerspageComponent implements OnInit {
  burgers: Burger[] = [];
  currentUser?: User;
  userName: string = '';

  constructor(
    private burgerService: BurgerService,
    private menuService: MenuService,
    private authService: AuthService, // ✅ injecte AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName() || '';
    this.loadBurgers();

    // ✅ construit l'objet User à partir du token JWT
    this.currentUser = {
      id: this.authService.getUserId(),
      email: this.authService.getUserEmail() || '',
      name: this.authService.getUserName() || '',
      role: this.authService.getUserRole() || '',
    };
  }

  loadBurgers(): void {
    this.burgerService.getAllBurgers().subscribe({
      next: (data) => {
        this.burgers = data;
      },
      error: (err) => {
        console.error('Erreur récupération burgers', err);
      },
    });
  }

  onBurgerClick(burger: Burger) {
    if (!this.currentUser) {
      console.error('Utilisateur non connecté');
      return;
    }

    const newMenu: Menu = {
      burger: burger.name, // ⚡ nom du burger
      user: this.currentUser, // ⚡ User décodé depuis le token
    };

    this.menuService.addMenu(newMenu).subscribe({
      next: (menu) => {
        console.log('Menu créé :', menu);

        // ✅ redirection avec l'id du menu créé
        this.router.navigate(['/drinkspage'], {
          queryParams: { menuId: menu.id },
        });
      },
      error: (err) => {
        console.error('Erreur lors de la création du menu', err);
      },
    });
  }
}
