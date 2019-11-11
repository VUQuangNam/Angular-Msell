import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
var citys = require('../../assets/JSON/citys.json');

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
    cityData: any = citys;
    product: any;
    marker_cental: any;
    product_id: string;
    images: any = [];
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
                this.product = next.data;
                console.log(this.product.images);
                this.product.images.forEach(element => {
                    let img = element.split('n/')[1];
                    this.images.push(img);
                });
                console.log(this.images);
                this.marker_cental = [
                    {
                        lat: this.product.coordinates.latitude,
                        lng: this.product.coordinates.longitude,
                        draggable: true
                    }
                ];
                this.markers = this.marker_cental;
                this.lat_central = +this.marker_cental[0].lat;
                this.lng_central = +this.marker_cental[0].lng;
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
    zoom: number = 18;
    lat_central: number;
    lng_central: number;
    markers = [];
}