import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
    filteredProduct: any;
    product: any = {};
    products: any;
    product_id: string;
    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.product_id = id;
        this.productService.getProductById(id).subscribe(
            next => {
                this.product = next;
                console.log(this.product);
            },
            error => {
                console.log(error);
                this.product = null;
            }
        );
    }

    deletePost() {
        var result = confirm("Bạn có chắc chắn xóa sản phẩm này?");
        if (result === true) {
            this.productService.deleteProduct(this.product_id).subscribe((res) => {
                if (res.success) return this.toastr.success('Delete', 'Xóa thành công!', {
                    timeOut: 2000
                }), this.router.navigate(['/list']);
                this.toastr.error(res.message, 'Error');
            });
        } else {
            console.log("NO DELTE")
        }
    }
}