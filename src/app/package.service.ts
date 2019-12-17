import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PackageService {
    headers: any = {};
    packages = [];
    token: string;
    private readonly API_URL = 'http://dev.msell.com.vn/api/packages';


    constructor(private http: HttpClient) {
        let user = localStorage.getItem('currentUser');
        user = JSON.parse(user);
        this.headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'x-request-id': user[this.token]
        };
    }
    getListIPackagesByUser(): Observable<any> {
        return this.http.get<any>(this.API_URL, {
            headers: this.headers
        });
    }

    // getIPackageById(packageId: string): Observable<IPackage> {
    //     return this.http.get<IPackage>(`${this.API_URL}/${(id)}`);
    // }


    // Create
    // createIPackage(packages: IPackage): Observable<IPackage> {
    //     return this.http.post<IPackage>(this.API_URL, packages);
    // }

    deleteIPackage(packageId: string): Observable<any> {
        return this.http.put(`${this.API_URL}/${packageId}`, null, {
            headers: this.headers
        });
    }


    // updateIPackage(packages: IPackage): Observable<IPackage> {
    //     return this.http.put<IPackage>(`${this.API_URL}/${packages.id}`, packages);
    // }


}
