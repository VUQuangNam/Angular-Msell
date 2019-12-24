import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const citys = require('../../assets/JSON/citys.json');

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
    cityData: any = citys;
    product: any;
    markerCental: any;
    productId: string;
    images: any = [];

    zoom = 16;
    latCentral: number;
    lngCengtral: number;
    markers = [];
    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.productId = id;
        this.productService.getProductById(id).subscribe(
            next => {
                this.product = next.data;
                this.product.images.forEach(element => {
                    const img = element.split('n/')[1];
                    this.images.push(img);
                });
                this.markerCental = [
                    {
                        lat: this.product.coordinates.latitude,
                        lng: this.product.coordinates.longitude,
                        draggable: true
                    }
                ];
                this.markers = this.markerCental;
                this.latCentral = +this.markerCental[0].lat;
                this.lngCengtral = +this.markerCental[0].lng;
            },
            error => {
                this.product = null;
            }
        );
    }

    deletePost() {
        const result = confirm('Bạn có chắc chắn xóa sản phẩm này?');
        if (result === true) {
            this.productService.deleteProduct(this.productId).subscribe((res) => {
                if (res.success) {
                    return this.toastr.success('Delete', 'Xóa thành công!', {
                        timeOut: 2000
                    }), this.router.navigate(['/list']);
                }
                this.toastr.error(res.message, 'Error');
            });
        }
    }

}
