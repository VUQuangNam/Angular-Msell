import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
var citys = require('../../assets/JSON/citys.json');
var wards = require('../../assets/JSON/wards.json');
var districts = require('../../assets/JSON/districts.json');
var streets = require('../../assets/JSON/streets.json');

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    marker_cental: any;
    cityData: any = citys;
    districtData: any = [];
    wardsData: any = [];
    streetData: any = [];
    product: Product;
    keypress: any;
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    product_id: string = "";
    urls = [];
    uploadForm: FormGroup;
    headers: any = {};
    img_list = [];
    img_add = []
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private toastr: ToastrService,
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) { }


    onSeclet(type: number, value?: any) {
        console.log(value, type);
        switch (type) {
            case 1:
                this.districtData = districts.filter(x => x.parent_code === value);
                break;
            case 2:
                this.wardsData = wards.filter(x => x.parent_code === value);
                this.streetData = streets.find(x => x.code === value).streets;
                break;
            case 3:
                this.wardsData.forEach(element => {
                    if (element.code === value) {
                        this.markers.splice(0, 1, {
                            lat: element.locations.latitude,
                            lng: element.locations.longitude,
                            draggable: true
                        })
                        console.log(this.markers);
                        this.lat_central = element.locations.latitude;
                        this.lng_central = element.locations.longitude
                        this.zoom = 14;
                        console.log(this.zoom, this.lng_central, this.lat_central);
                    }
                });
                break;
            default:
                break;
        }
    }
    onChange(event) {
        this.img_add = [];
        if (event.target.files.length > 0) {
            const formData = new FormData();
            // Object.keys(event.target.files).forEach(element => {
            //     const data = event.target.files[element];
            //     this.uploadForm.get('data_upload').setValue(data);
            //     formData.append('images', this.uploadForm.get('data_upload').value);
            // });
            for (let file in event.target.files) {
                const data = event.target.files[file];
                this.uploadForm.get('data_upload').setValue(data);
                formData.append('images', this.uploadForm.get('data_upload').value);
            }
            this.http.post<any>('http://dev.msell.com.vn/api/upload_images/product', formData).subscribe(
                (res) => {
                    this.img_list = this.img_list.concat(res.data);
                    console.log(this.img_list);
                    this.img_list.forEach(element => {
                        this.img_add.push(element.split('n/')[1])
                    })
                }, (err) => console.log(err));
        }

    }

    deleteImg(ix) {
        this.img_list = [];
        this.img_add.splice(ix, 1);
        this.img_add.forEach(element => {
            element = "n/" + element;
            this.img_list.push(element)
        });
    }

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            data_upload: [],
        });
        const id = this.route.snapshot.paramMap.get('id');
        this.product_id = id;
        this.productService.getProductById(id).subscribe(
            next => {
                this.product = next.data;
                this.img_list = this.product.images;
                this.img_list.forEach(element => {
                    this.img_add.push(element.split('n/')[1]);
                });
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
                this.districtData = districts.filter(x => x.parent_code === this.product.city_id);
                this.wardsData = wards.filter(x => x.parent_code === this.product.district_id);
                this.streetData = streets.find(x => x.code === this.product.district_id).streets;

            }, error => {
                console.log(error);
                this.product = null;
            }
        );
    }

    onSubmit(data) {
        if (data.invalid) return alert("error validate");
        let check_user = localStorage.getItem("currentUser");
        let user = JSON.parse(check_user);
        let { user_info } = user;
        let { value } = data;
        value.owner_info = {
            owner_type: 1,
            owner_id: user_info.uid
        }
        value.properties = {
            address: data.value.address,
            direction_balcony: data.value.direction_balcony,
            type_of_post: data.value.type_of_post,
            price: data.value.price,
            acreage: data.value.acreage,
            category: data.value.category,
            facade: data.value.facade,
            road_wide: data.value.road_wide
        }
        value.location = {
            latitude: data.value.latitude,
            longitude: data.value.longitude
        }
        let req = {
            product_id: this.product_id,
            data: value
        }
        value.images = this.img_list;
        this.productService.updateProduct(req).subscribe((res) => {
            if (res.success) {
                this.toastr.success('Success', 'Cập nhật thành công!');
            } else {
                this.toastr.error('Error', 'Cập nhật thất bại!');
            }
        },
            error => console.log(error)
        );
    }
    // google maps zoom level
    zoom: number = 14;

    markerDragEnd(m: marker, $event: MouseEvent) {
        this.markers.splice(0, 1, {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });
        console.log(this.markers);
    }
    input_lat(value) {
        clearTimeout(this.keypress);
        this.keypress = setTimeout(async () => {
            value = parseFloat(value)
            this.markers[0].lat = value;
            this.lat_central = value;
            this.zoom = 14;
        }, 500)
    }
    input_lng(value) {
        clearTimeout(this.keypress);
        this.keypress = setTimeout(async () => {
            value = parseFloat(value)
            this.markers[0].lng = value;
            this.lng_central = value;
            this.zoom = 14;
        }, 500)
    }
    markers: marker[] = [];
    lat_central: number;
    lng_central: number;

}
