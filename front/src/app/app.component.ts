import 'rxjs';

import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { UserService } from "./shared/user.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  public isAuthenticated: Observable<boolean>;

  constructor(
    private user: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.user.isAuthenticated;
  }

  logout() {
    this.user.logout()
      .subscribe(() => this.router.navigate(['/']));

    return false;
  }

}
