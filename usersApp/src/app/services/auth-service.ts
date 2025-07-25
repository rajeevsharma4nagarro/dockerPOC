import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../models/app.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  login(credentials: { userId: string, password: string }): Observable<any> {
    return this.http.post(`${ this.globalService.apiUrl }/login`, credentials);
    //return of(Mock_Users.filter(x => x.userId == credentials.userId && x.password == credentials.password));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null && localStorage.getItem('token') !== '';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string| null {
    return localStorage.getItem('token');
  }
}
