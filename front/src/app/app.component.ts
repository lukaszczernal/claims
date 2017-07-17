import 'rxjs';

import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { UserService } from "./shared/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.html'
})
export class AppComponent {

  constructor(
    private user: UserService,
    private router: Router
  ) { }

  logout() {
    this.user.logout()
      .subscribe(() => this.router.navigate(['/']));

    return false;
  }

}
