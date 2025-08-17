import { Component, OnInit } from '@angular/core';
import { User } from '../../models/iUser.interface';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit {

  users: User[] = [];

  constructor(private service: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.data;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('user load completed.');
      }
    });
  }

  edit(_id: string) {
    this.router.navigate(['/edit', _id]);
  }

  delete(_id: string) {
    this.service.deleteUser(_id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('user delete completed.');
      }
    });;

  }
}
