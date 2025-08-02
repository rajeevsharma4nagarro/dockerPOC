import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { GlobalService } from '../../models/app.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})
export class UserLogin {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private globalService: GlobalService,private router: Router) {
    this.loginForm = this.fb.group({
      userId: ['admin', Validators.required],
      password: ['admin1', Validators.required]
    });
  }

  login() {
    if(this.loginForm.valid)
    {
      this.authService.login(this.loginForm.value).subscribe(
        {
          next:(res) => {
            this.authService.setToken(res.token, this.loginForm.value);
            this.router.navigate(['/home']);
          },
          error: (e) => {
            console.log(e);
          },
          complete: () => {

          }
        });
    }
  }
}
