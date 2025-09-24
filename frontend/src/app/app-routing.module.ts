import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BurgerspageComponent } from './features/burgerspage/burgerspage.component';
import { HomeComponent } from './features/home/home.component';
import { LayoutComponent } from './core/layout/layout.component';
import { BurgersComponent } from './features/burgers/burgers.component';
import { DrinksComponent } from './features/drinks/drinks.component';
import { DessertComponent } from './features/dessert/dessert.component';
import { DrinkspageComponent } from './features/drinkspage/drinkspage.component';
import { DessertspageComponent } from './features/dessertspage/dessertspage.component';
import { BasketComponent } from './features/basket/basket.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ConfirmResetPasswordComponent } from './features/confirm-reset-password/confirm-reset-password.component';
import { AdminRequiredComponent } from './features/admin-required/admin-required.component';
import { AdminrequiredGuard } from './core/guards/adminrequired.guard';
import { CommonGuard } from './core/guards/common.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'burgerspage',
        component: BurgerspageComponent,
        canActivate: [CommonGuard],
      },
      {
        path: 'burgers',
        component: BurgersComponent,
        canActivate: [AdminrequiredGuard],
      },
      {
        path: 'drinks',
        component: DrinksComponent,
        canActivate: [AdminrequiredGuard],
      },
      {
        path: 'desserts',
        component: DessertComponent,
        canActivate: [AdminrequiredGuard],
      },
      {
        path: 'drinkspage',
        component: DrinkspageComponent,
        canActivate: [CommonGuard],
      },
      {
        path: 'dessertspage',
        component: DessertspageComponent,
        canActivate: [CommonGuard],
      },
      { path: 'basket', component: BasketComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminrequiredGuard],
      },
      { path: 'reset-password', component: ConfirmResetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
