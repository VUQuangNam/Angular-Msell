import { Injectable } from '@angular/core';
import { IPackage } from './package';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PackageService {
    headers: any = {}
    packages = [];
    private readonly API_URL = 'http://dev.msell.com.vn/api/packages';


    constructor(private http: HttpClient) {
        let user = localStorage.getItem('currentUser');
        user = JSON.parse(user);
        this.headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'x-request-id': user['token']
        }
    }
    getListIPackagesByUser(): Observable<any> {
        return this.http.get<any>(this.API_URL, {
            headers: this.headers
        });
    }

    // getIPackageById(package_id: string): Observable<IPackage> {
    //     return this.http.get<IPackage>(`${this.API_URL}/${(id)}`);
    // }


    //Create
    // createIPackage(packages: IPackage): Observable<IPackage> {
    //     return this.http.post<IPackage>(this.API_URL, packages);
    // }

    deleteIPackage(package_id: string): Observable<any> {
        return this.http.put(`${this.API_URL}/${package_id}`, null, {
            headers: this.headers
        });
    }


    // updateIPackage(packages: IPackage): Observable<IPackage> {
    //     return this.http.put<IPackage>(`${this.API_URL}/${packages.id}`, packages);
    // }


}
