import { Component } from '@angular/core';
import { GlobalService } from './models/app.const';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected title = 'users-app';
  headerVisible= false;
  constructor(private globalService: GlobalService, private route: Router) {

  }
  onActivate(ev: any) {
    const authToken = localStorage.getItem('token');
    const userDetails = localStorage.getItem('userDetails');
    this.headerVisible = userDetails? true: false;
    if (!authToken || !userDetails) {
      this.route.navigate(['/']);
    }
  }
}
