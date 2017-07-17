import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
    styleUrls: [ './signup.component.css' ],
    templateUrl: './signup.component.html'
})
export class SignupComponent {

    constructor(
        private user: UserService,
        private router: Router
    ) {}

    onSubmit(userData) {
        this.user.signUp(userData.value)
            .subscribe(() => this.router.navigate(['login']));
    }

}
