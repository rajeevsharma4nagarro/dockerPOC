import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { iUser } from "./iUser.interface";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    apiUrl = 'http://localhost:3000';

    private userData = localStorage.getItem('userDetails');
    userLoginSubject : Observable<any> = of(this.userData? JSON.parse(this.userData): null);
}