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

    add(claim): Observable<any> {
        console.log('this.config;', this.config);
        return this.http.post(`${this.config.apihost}/claim`, claim)
    }


}