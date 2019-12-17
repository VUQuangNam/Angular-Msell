import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>
            (JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    login(username: string, password: string) {
        return this.http.post<any>(`http://dev.msell.com.vn/api/users/login`, { username, password }).pipe(map(user => {
            if (user && user.data) {
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                this.currentUserSubject.next(user.data);
                console.log(user.data);
            }
            return user;
        }));

    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
