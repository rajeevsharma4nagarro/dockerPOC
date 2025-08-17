import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {

  userForm: FormGroup;
  isEdit = false;
  id: string | null = null;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    public router: Router) {
    this.userForm = this.fb.group({
      id: [''],
      userId: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required],
      isActive: [false],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.userService.getUserById(this.id).subscribe((user: any) => {
        if (user) {
          this.userForm.patchValue(user.data);
        }
      });
    }
  }

  submitForm() {
    if (this.userForm.invalid) return;
    if (this.isEdit && this.id) {
      this.userService.updateUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
