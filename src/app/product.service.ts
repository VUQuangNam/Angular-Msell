import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products = [];
    headers: any = {}
    private readonly API_URL = 'http://dev.msell.com.vn/api/products';

    constructor(private http: HttpClient) {
        let user = localStorage.getItem('currentUser');
        user = JSON.parse(user);
        this.headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'x-request-id': user['token']
        }
    }

    getListProductsByUser(): Observable<any> {
        return this.http.get<any>(this.API_URL + '/posts/me/', {
            headers: this.headers
        });
    }

    getProductById(product_id: string): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/${product_id}`, {
            headers: this.headers
        });
    }

    //Create
    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.API_URL, product, {
            headers: this.headers
        });
    }

    deleteProduct(product_id: string): Observable<any> {
        return this.http.put(`${this.API_URL}/${product_id}`, null, {
            headers: this.headers
        });
    }

    updateProduct(product: any): Observable<any> {
        return this.http.put<any>(this.API_URL, product, {
            headers: this.headers
        });
    }
}