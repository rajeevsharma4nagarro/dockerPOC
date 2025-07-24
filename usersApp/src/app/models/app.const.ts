import { BehaviorSubject, Subject } from "rxjs";
import { iUser } from "./iUser.interface";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    apiUrl = 'http://localhost:3000';
    userLoginSubject = new BehaviorSubject<iUser|undefined>(undefined);
}