import { Injectable, Injector } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CONFIG, EnvConfig } from "./config";
import { CookieService } from "ngx-cookie";

@Injectable()
export class UserService {

    private config: EnvConfig;

    constructor(
        private http: Http,
        private injector: Injector,
        private cookie: CookieService
    ) {
        this.config = this.injector.get(CONFIG);
    }

    logout(): Observable<Response> {
        return this.http.post(`${this.config.apihost}/users/logout`, {}, { withCredentials: true })
            .do(() => this.cookie.remove('sid'));
    }

    login(userData): Observable<Response> {
        return this.http.post(`${this.config.apihost}/users/login`, userData)
            .map(res => res && res.json && res.json())
            .map(res => res.id)
            .do(sid => this.cookie.put('sid', sid));
    }

    isAuthenticated(): Observable<boolean> {
        return this.http.get(`${this.config.apihost}/users/me`, { withCredentials: true })
            .map(res => res && res.json && res.json())
            .map(res => Boolean(res));
    }


}