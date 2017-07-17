import { Injectable, Injector } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CONFIG, EnvConfig } from "./config";

@Injectable()
export class ClaimService {

    private config: EnvConfig;

    constructor(
        private http: Http,
        private injector: Injector
    ) {
        this.config = this.injector.get(CONFIG)
    }

    add(claim: Claim): Observable<any> {
        return this.http.post(`${this.config.apihost}/claim`, claim)
    }

    update(claim: Claim): Observable<any> {
        return this.http.put(`${this.config.apihost}/claim`, claim)
    }

    getList(): Observable<Claim[]> {
        return this.http.get(`${this.config.apihost}/claim`)
            .map(res => res && res.json && res.json());
    }

}

export interface Claim {
    id: string;
    name: string;
    email: string;
    policyId: number;
    amount: number;
    dateOccurred: number;
    status: number;
}
