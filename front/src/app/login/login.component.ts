import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
    styleUrls: [ './login.component.css' ],
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor(
        private user: UserService,
        private router: Router
    ) {}

    onSubmit(userData) {
        this.user.login(userData.value)
            .subscribe(() => this.router.navigate(['manager']));
    }

}
