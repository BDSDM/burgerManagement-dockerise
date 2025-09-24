import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AdminpowerComponent } from 'src/app/features/adminpower/adminpower.component';
import { ConfirmAdminActivationComponent } from 'src/app/features/confirm-admin-activation/confirm-admin-activation.component';
import { LoginComponent } from 'src/app/features/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    public authService: AuthService,
    private userService: UserService
  ) {}

  openConnexionDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px'; // largeur personnalisée
    dialogConfig.height = '470px';
    dialogConfig.panelClass = 'custom-dialog-container'; // pour personnaliser le centrage si besoin

    this.dialog.open(LoginComponent, dialogConfig);
  }
  logout() {
    this.authService.logout();
  }
  onRedButtonClick() {
    const dialogRef = this.dialog.open(ConfirmAdminActivationComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si l'utilisateur confirme
        const userId = this.authService.getUserId();
        if (!userId) {
          console.error('Utilisateur non connecté');
          return;
        }

        this.userService.getUserById(userId).subscribe({
          next: (user) => {
            user.role = 'admin';
            this.userService.updateUser(userId, user).subscribe({
              next: (response) => {
                this.executeRefreshToken();
                this.adminpower();
                console.log('Statut utilisateur mis à jour à admin', response);
              },
              error: (err) => {
                console.error('Erreur lors de la mise à jour du statut', err);
              },
            });
          },
          error: (err) => {
            console.error('Erreur récupération utilisateur', err);
          },
        });
      }
    });
  }
  private executeRefreshToken() {
    this.userService.refreshAccessToken().subscribe({
      next: (newToken) => {
        localStorage.setItem('token', newToken);
        console.log('Token mis à jour avec succès');
      },
      error: (err) => {
        console.error('Erreur lors du rafraîchissement :', err);
        this.authService.logout();
      },
    });
  }

  adminpower() {
    this.dialog.open(AdminpowerComponent, {
      width: '350px',
      disableClose: true,
    });
  }
}
