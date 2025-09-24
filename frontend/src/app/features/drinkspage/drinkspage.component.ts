import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { Menu } from 'src/app/core/models/menu.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Drink } from 'src/app/core/models/drink.model';
import { DrinkService } from 'src/app/core/services/drink.service';

@Component({
  selector: 'app-drinkspage',
  templateUrl: './drinkspage.component.html',
  styleUrls: ['./drinkspage.component.css'],
})
export class DrinkspageComponent implements OnInit {
  drinks: Drink[] = [];
  currentUser?: User;
  currentMenuId?: number;

  constructor(
    private drinkService: DrinkService,
    private menuService: MenuService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDrinks();

    // Construit l'objet User à partir du token JWT
    this.currentUser = {
      id: this.authService.getUserId(),
      email: this.authService.getUserEmail() || '',
      name: this.authService.getUserName() || '',
      role: this.authService.getUserRole() || '',
    };

    // Récupère le menuId depuis l’URL
    this.route.queryParams.subscribe((params) => {
      this.currentMenuId = params['menuId'];
    });
  }

  loadDrinks(): void {
    this.drinkService.getAllDrinks().subscribe({
      next: (data) => {
        this.drinks = data;
      },
      error: (err) => {
        console.error('Erreur récupération drinks', err);
      },
    });
  }

  onDrinkClick(drink: Drink): void {
    if (!this.currentMenuId) {
      console.error('Menu ID non défini');
      return;
    }

    // Récupérer le menu actuel
    this.menuService.getMenuById(this.currentMenuId).subscribe({
      next: (menu: Menu) => {
        // Mettre à jour le champ drink du menu
        menu.drink = drink.name;

        // Sauvegarder le menu mis à jour avec updateMenu
        this.menuService.updateMenu(this.currentMenuId!, menu).subscribe({
          next: () => {
            console.log('Menu mis à jour avec boisson :', menu);

            // Rediriger vers dessertspage en passant le menuId
            this.router.navigate(['/dessertspage'], {
              queryParams: { menuId: this.currentMenuId },
            });
          },
          error: (err) => console.error('Erreur mise à jour menu', err),
        });
      },
      error: (err) => console.error('Erreur récupération menu', err),
    });
  }

  goToBasket() {
    if (!this.currentMenuId) {
      console.error('Menu ID non défini');
      return;
    }
    this.router.navigate(['/basket'], {
      queryParams: { menuId: this.currentMenuId },
    });
  }
}
