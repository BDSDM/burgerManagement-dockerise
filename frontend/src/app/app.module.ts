import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { RequestResetPasswordComponent } from './features/request-reset-password/request-reset-password.component';
import { ConfirmLogoutDialogComponent } from './features/confirm-logout-dialog/confirm-logout-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './features/home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LayoutComponent } from './core/layout/layout.component';
import { ConfirmAdminActivationComponent } from './features/confirm-admin-activation/confirm-admin-activation.component';
import { AdminpowerComponent } from './features/adminpower/adminpower.component';
import { BurgerspageComponent } from './features/burgerspage/burgerspage.component';
import { MatCardModule } from '@angular/material/card'; // <-- Import nécessaire
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { BurgersComponent } from './features/burgers/burgers.component';
import { MatTableModule } from '@angular/material/table'; // <-- importer ici
import { MatSelectModule } from '@angular/material/select';
import { DrinkspageComponent } from './features/drinkspage/drinkspage.component';
import { DrinksComponent } from './features/drinks/drinks.component';
import { DessertComponent } from './features/dessert/dessert.component';
import { DessertspageComponent } from './features/dessertspage/dessertspage.component';
import { BasketComponent } from './features/basket/basket.component';
import { RefreshTokenPopupComponent } from './features/refresh-token-popup/refresh-token-popup.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ConfirmDeleteUserDialogComponent } from './features/confirm-delete-user-dialog/confirm-delete-user-dialog.component';
import { UpdateUserDialogComponent } from './features/update-user-dialog/update-user-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDeleteBurgerDialogComponent } from './features/confirm-delete-burger-dialog/confirm-delete-burger-dialog.component';
import { ConfirmDeleteDrinkDialogComponent } from './features/confirm-delete-drink-dialog/confirm-delete-drink-dialog.component';
import { ConfirmDeleteDessertDialogComponent } from './features/confirm-delete-dessert-dialog/confirm-delete-dessert-dialog.component';
import { ConfirmResetPasswordComponent } from './features/confirm-reset-password/confirm-reset-password.component';
import { AdminRequiredComponent } from './features/admin-required/admin-required.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RequestResetPasswordComponent,
    ConfirmLogoutDialogComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    LayoutComponent,
    ConfirmAdminActivationComponent,
    AdminpowerComponent,
    BurgerspageComponent,
    BurgerspageComponent,
    BurgersComponent,
    DrinkspageComponent,
    DrinksComponent,
    DessertComponent,
    DessertspageComponent,
    BasketComponent,
    RefreshTokenPopupComponent,
    DashboardComponent,
    ConfirmDeleteUserDialogComponent,
    UpdateUserDialogComponent,
    ConfirmDeleteBurgerDialogComponent,
    ConfirmDeleteDrinkDialogComponent,
    ConfirmDeleteDessertDialogComponent,
    ConfirmResetPasswordComponent,
    AdminRequiredComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
