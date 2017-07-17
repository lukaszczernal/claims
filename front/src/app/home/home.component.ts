import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http";
import { ClaimService } from "../shared/claim.service";
import { Router } from "@angular/router";

@Component({
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(
        private claim: ClaimService,
        private router: Router
    ) {}

    onSubmit(form: NgForm) {
        if (form.valid) {

            this.claim.add(form.value)
                .do(() => this.router.navigate(['/manager']))
                .subscribe(
                    (() => console.log('submited', form)),
                    (err => console.log('err', err)) // TODO implement toastr
                )

            } else {
                // TODO show erros
        }
    }

}
