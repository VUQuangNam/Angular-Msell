import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
    filteredProduct: Product[] = [];
    product: any = {};
    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.productService.getListProductsByUser().subscribe(
            next => {
                this.filteredProduct = next;
            }
        );
        const id = +this.route.snapshot.paramMap.get('id');
        this.productService.getProductById(id).subscribe(
            next => {
                this.product = next;
                console.log(next);
                console.log(this.product);
            },
            error => {
                console.log(error);
                this.product = null;
            }
        );
    }
    deletePost(i) {
        var result = confirm("Bạn có chắc chắn xóa sản phẩm này?");
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
