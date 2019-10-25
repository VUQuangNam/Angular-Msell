import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
// import { Http } from "@angular/http";

@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
    filteredProduct: Product[] = [];
    product: Product[] = [];
    
    constructor(
        private router: Router,
        private productService: ProductService,
        private route: ActivatedRoute,
        private http: HttpClient
    ) { 

    }

    ngOnInit() {

        this.productService.getListProductsByUser().subscribe(
            next => {
                this.filteredProduct = next;
            }
        );
        this.productService
            .getProducts()
            .subscribe(next => {
                this.filteredProduct = next
            }, error => {
                console.log(error);
                this.filteredProduct = []
            });
    }

    search(key) {
        this.filteredProduct = this.filteredProduct.filter(product => product.productcode.toLowerCase().includes(key.toLowerCase()));
        console.log("list " + this.filteredProduct.length);
    }
    

    deletePost(i) {
        var result = confirm("Bạn có chắc chắn xóa người dùng này?");
        if (result == true) {
            for (let j = 0; j < this.filteredProduct.length; j++) {
                const product = this.filteredProduct[j];
                if (product.id === i) {
                    console.log(product);
                    this.productService.deleteProduct(product.id).subscribe(() => {
                        console.log("delete " + product.id);
                        const indexOf = this.filteredProduct.indexOf(product);
                        this.filteredProduct.splice(indexOf, 1);
                        alert("Delete done");
                        console.log("Delete");
                    });
                }
            }
        } else {
            console.log("NO DELTE")
        }


    }

}
