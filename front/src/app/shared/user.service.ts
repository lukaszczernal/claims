import { Injectable, Injector } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CONFIG, EnvConfig } from "./config";
import { CookieService } from "ngx-cookie";
import { Subject } from "rxjs/Subject";

@Injectable()
export class UserService {

    public isAuthenticated: Observable<boolean>;
    private config: EnvConfig;
    private _isAuthenticated: Subject<boolean> = new Subject();

    constructor(
        private http: Http,
        private injector: Injector,
        private cookie: CookieService
    ) {
        this.config = this.injector.get(CONFIG);

        this.isAuthenticated = this.checkAuthenticated()
            .merge(this._isAuthenticated);
    }

    signUp(userData): Observable<Response> {
        return this.http.post(`${this.config.apihost}/users`, userData);
    }

    logout(): Observable<Response> {
        return this.http.post(`${this.config.apihost}/users/logout`, {}, { withCredentials: true })
            .do(() => this.cookie.remove('sid'))
            .do(() => this._isAuthenticated.next(false));
    }

    login(userData): Observable<Response> {
        return this.http.post(`${this.config.apihost}/users/login`, userData)
            .map(res => res && res.json && res.json())
            .map(res => res.id)
            .do(sid => this.cookie.put('sid', sid))
            .do(() => this._isAuthenticated.next(true));
    }

    checkAuthenticated(): Observable<boolean> {
        return this.http.get(`${this.config.apihost}/users/me`, { withCredentials: true })
            .map(res => res && res.json && res.json())
            .map(res => Boolean(res));
    }


}