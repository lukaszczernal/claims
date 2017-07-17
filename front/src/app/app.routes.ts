import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { ManagerComponent } from "./manager/manager.component";
import { UserAuthenticatedGuard } from "./user-authenticated.guard";
import { LoginComponent } from "./login/login.component";

export const ROUTES: Routes = [
  { path: '',      redirectTo: '/form', pathMatch: 'full' },
  { path: 'form',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [ UserAuthenticatedGuard ]
  },
  { path: '**',    component: NoContentComponent },
];
