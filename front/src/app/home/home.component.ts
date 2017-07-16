import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http";
import { ClaimService } from "../shared/claim.service";

@Component({
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private claim: ClaimService) {}

    onSubmit(form: NgForm) {
        if (form.valid) {

            this.claim.add(form.value)
            .subscribe(
                (() => console.log('submited', form)),
                (err => console.log('err', err)) // TODO implement toastr
            )

            } else {
            // TODO show erros
        }
    }

}
