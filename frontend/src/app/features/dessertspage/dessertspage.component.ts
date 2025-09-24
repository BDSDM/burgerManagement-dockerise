import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { Menu } from 'src/app/core/models/menu.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Dessert } from 'src/app/core/models/dessert.model';
import { DessertService } from 'src/app/core/services/dessert.service';

@Component({
  selector: 'app-dessertspage',
  templateUrl: './dessertspage.component.html',
  styleUrls: ['./dessertspage.component.css'],
})
export class DessertspageComponent implements OnInit {
  desserts: Dessert[] = [];
  currentUser?: User;
  currentMenuId?: number;

  constructor(
    private dessertService: DessertService,
    private menuService: MenuService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDesserts();

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

  loadDesserts(): void {
    this.dessertService.getAllDesserts().subscribe({
      next: (data) => {
        this.desserts = data;
      },
      error: (err) => {
        console.error('Erreur récupération desserts', err);
      },
    });
  }

  onDessertClick(dessert: Dessert): void {
    if (!this.currentMenuId) {
      console.error('Menu ID non défini');
      return;
    }

    // Récupérer le menu actuel
    this.menuService.getMenuById(this.currentMenuId).subscribe({
      next: (menu: Menu) => {
        // Mettre à jour le champ dessert du menu
        menu.dessert = dessert.name;

        // 🔹 Utiliser updateMenu au lieu de addMenu
        this.menuService.updateMenu(this.currentMenuId!, menu).subscribe({
          next: () => {
            console.log('Menu mis à jour avec dessert :', menu);

            // Rediriger vers la page panier
            this.router.navigate(['/basket'], {
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
