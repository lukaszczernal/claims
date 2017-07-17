import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "./shared/user.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserAuthenticatedGuard implements CanActivate {
    constructor(
        private user: UserService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
    return this.user.checkAuthenticated()
        .do(isAuth => {
            if (!isAuth) {
                this.router.navigate(['login']);
            }
        });
    }
}