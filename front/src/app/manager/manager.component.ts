import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ClaimService, Claim } from "../shared/claim.service";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Component({
    styleUrls: [ './manager.component.css' ],
    templateUrl: './manager.component.html'
})
export class ManagerComponent implements OnInit {

    public claims: Observable<Claim[]>;
    public claimsNew: Observable<Claim[]>;
    public claimsApproved: Observable<Claim[]>;
    public claimsRejected: Observable<Claim[]>;
    public listUpdates: ReplaySubject<any> = new ReplaySubject(1);

    constructor(
        private claim: ClaimService
    ) {}

    ngOnInit() {
        this.claims = this.claim.getList()
            .map(items => list => items)
            .merge(this.listUpdates)
            .scan((items, operation) => operation(items), [])
            .publishReplay(1)
            .refCount();

        this.claimsNew = this.claims
            .map(items => items.filter(item => item.status === 1))

        this.claimsApproved = this.claims
            .map(items => items.filter(item => item.status === 2))

        this.claimsRejected = this.claims
            .map(items => items.filter(item => item.status === 3))
    }

    setNew(claim: Claim) {
        claim.status = 1;
        this.updateClaim(claim);
        return false
    }

    approve(claim: Claim) {
        claim.status = 2;
        this.updateClaim(claim);
        return false
    }

    reject(claim: Claim) {
        claim.status = 3;
        this.updateClaim(claim);
        return false
    }

    private updateClaim(claim) {
        this.claim.update(claim)
            .do(claim => this.listUpdates.next(items => {
                let toBeUpdatedClaim = items.find(item => item.id === claim.id);
                if (toBeUpdatedClaim) {
                    toBeUpdatedClaim = claim;
                }
                return items;
            }))
            .subscribe()
    }



}
