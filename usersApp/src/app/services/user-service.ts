import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iUser, User } from '../models/iUser.interface';
import { GlobalService } from '../models/app.const';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient, private globalService: GlobalService, private auth: AuthService) {  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${ this.globalService.apiUrl }/users`);
  }

  createUser(value: iUser): Observable<any> {
    return this.http.post<any>(`${ this.globalService.apiUrl }/add`, value);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${ this.globalService.apiUrl }/user/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${ this.globalService.apiUrl }/delete/${id}`);
  }

  updateUser(value: iUser): Observable<any> {
    return this.http.patch<iUser>(`${ this.globalService.apiUrl }/update`, value);
  }
}
 