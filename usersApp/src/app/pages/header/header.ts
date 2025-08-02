import { Component } from '@angular/core';
import { iUser } from '../../models/iUser.interface';
import { GlobalService } from '../../models/app.const';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  user: iUser | undefined;
  constructor(private globalService: GlobalService, private authService: AuthService, private route : Router) {
    this.globalService.userLoginSubject.subscribe(x => {
      this.user = x;
    });
  }

  logout() {
    this.authService.clearToken();
    this.user = undefined;
    this.route.navigate(['/']);
  }
}
