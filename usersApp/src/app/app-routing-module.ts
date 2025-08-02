import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLogin } from './pages/user-login/user-login';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { UserManagement } from './pages/user-management/user-management';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '' , component: UserLogin},
  {path: 'home', component: UserDashboard, canActivate: [AuthGuard]},//
  {path: 'add', component: UserManagement, canActivate: [AuthGuard]},//
  {path: 'edit/:id', component: UserManagement, canActivate: [AuthGuard]}
];//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
