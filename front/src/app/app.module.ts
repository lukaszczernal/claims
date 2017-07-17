import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { NoContentComponent } from './no-content';
import { ClaimService } from "./shared/claim.service";
import { CONFIG } from "./shared/config";
import { UserService } from "./shared/user.service";
import { ManagerComponent } from "./manager/manager.component";
import { UserAuthenticatedGuard } from "./user-authenticated.guard";
import { LoginComponent } from "./login/login.component";
import { CookieModule } from 'ngx-cookie';
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ManagerComponent,
    NoContentComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    CommonModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    ClaimService,
    UserService,
    UserAuthenticatedGuard,
    {
      provide: CONFIG,
      useValue: ENV_CONFIG
    }
  ]
})
export class AppModule { }
