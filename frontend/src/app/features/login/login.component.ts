import { Component, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  user: User = { id: 0, name: '', email: '', password: '' };
  showPassword: boolean = false; // <-- variable pour toggle
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { email: string; password: string },

    private dialogRef: MatDialogRef<LoginComponent> // 👈 Référence à CE dialog
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.user.email = this.data.email;
      this.user.password = this.data.password;

      // Pour que les champs soient vraiment préremplis
      this.email = this.data.email;
      this.password = this.data.password;
    }
  }
  onSubmit() {
    this.loginError = false;
    this.isSubmitting = true; // <-- active feedback bouton

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token, response.refreshToken);

        // ✅ Fermer uniquement CE dialog, pas tous
        this.dialogRef.close();

        // ✅ Rediriger après fermeture
        this.router.navigate(['/burgerspage']);
        this.isSubmitting = false; // <-- réinitialise
      },
      error: (err) => {
        console.error('Erreur lors du login', err);

        // ❌ Ne pas fermer le dialog ici
        this.loginError = true;
        this.isSubmitting = false; // <-- réinitialise
        // 🔄 Mise à jour forcée pour s'assurer que l'erreur est affichée
        this.cdRef.detectChanges();
      },
    });
  }

  changePassword() {
    // ✅ Ne ferme pas tous les dialogs, seulement celui-ci si tu veux
    this.dialogRef.close();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    this.dialog.open(RequestResetPasswordComponent, dialogConfig);
  }
  openRegisterDialog(): void {
    this.dialogRef.close(); // Ferme le login si nécessaire

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '400px';

    this.dialog.open(RegisterComponent, dialogConfig);
  }
}
