import { Injectable } from '@angular/core';
import { IPackage } from './package';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PackageService {
    packages: IPackage[] = [];
    private readonly API_URL = 'http://5da3dc1aa6593f001407a03e.mockapi.io/api/v1/package';


    constructor(private http: HttpClient) {

    }
    getIPackages(count = 10000): Observable<IPackage[]> {
        return this.http.get<IPackage[]>(this.API_URL).pipe(
            map(response => response.filter((packages, i) => i < count))
        );
    }

    getIPackageById(id: number): Observable<IPackage> {
        return this.http.get<IPackage>(`${this.API_URL}/${(id)}`);
    }


    //Create
    createIPackage(packages: IPackage): Observable<IPackage> {
        return this.http.post<IPackage>(this.API_URL, packages);
    }



    deleteIPackage(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/${id}`);

    }

    updateIPackage(packages: IPackage): Observable<IPackage> {
        return this.http.put<IPackage>(`${this.API_URL}/${packages.id}`, packages);
    }

    getListIPackagesByUser(): Observable<any> {
        return this.http.get<any>(this.API_URL);
    }
}
