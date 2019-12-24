import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

const citys = require('../../assets/JSON/citys.json');
const wards = require('../../assets/JSON/wards.json');
const districts = require('../../assets/JSON/districts.json');
const streets = require('../../assets/JSON/streets.json');

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private toastr: ToastrService,
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) { }
    markerCental: any;
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
    productId: string;
    urls = [];
    uploadForm: FormGroup;
    headers: any = {};
    imgList = [];
    imgAdd = [];

    // google maps zoom level
    zoom = 14;
    markers: Marker[] = [];
    latCentral: number;
    lngCentral: number;


    onSeclet(type: number, value?: any) {
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
                        });
                        this.latCentral = element.locations.latitude;
                        this.lngCentral = element.locations.longitude;
                        this.zoom = 14;
                    }
                });
                break;
            default:
                break;
        }
    }
    onChange(event) {
        this.imgAdd = [];
        if (event.target.files.length > 0) {
            const formData = new FormData();
            Object.keys(event.target.files).forEach(element => {
                const data = event.target.files[element];
                this.uploadForm.get('data_upload').setValue(data);
                formData.append('images', this.uploadForm.get('data_upload').value);
            });
            // for (const file in event.target.files) {
            //     const data = event.target.files[file];
            //     this.uploadForm.get('data_upload').setValue(data);
            //     formData.append('images', this.uploadForm.get('data_upload').value);
            // }
            this.http.post<any>('http://dev.msell.com.vn/api/upload_images/product', formData).subscribe(
                (res) => {
                    this.imgList = this.imgList.concat(res.data);
                    this.imgList.forEach(element => {
                        this.imgAdd.push(element.split('n/')[1]);
                    });
                }, (err) => console.log(err));
        }

    }

    deleteImg(ix) {
        this.imgList = [];
        this.imgAdd.splice(ix, 1);
        this.imgAdd.forEach(element => {
            element = 'n/' + element;
            this.imgList.push(element);
        });
    }

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            data_upload: [],
        });
        const id = this.route.snapshot.paramMap.get('id');
        this.productId = id;
        this.productService.getProductById(id).subscribe(
            next => {
                this.product = next.data;
                this.imgList = this.product.images;
                this.imgList.forEach(element => {
                    this.imgAdd.push(element.split('n/')[1]);
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
                this.lngCentral = +this.markerCental[0].lng;
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
        if (data.invalid) { return alert('error validate'); }
        const checkUser = localStorage.getItem('currentUser');
        const user = JSON.parse(checkUser);
        const { user_info } = user;
        const { value } = data;
        value.owner_info = {
            owner_type: 1,
            owner_id: user_info.uid
        };
        value.properties = {
            address: data.value.address,
            direction_balcony: data.value.direction_balcony,
            type_of_post: data.value.type_of_post,
            price: data.value.price,
            acreage: data.value.acreage,
            category: data.value.category,
            facade: data.value.facade,
            road_wide: data.value.road_wide
        };
        value.location = {
            latitude: data.value.latitude,
            longitude: data.value.longitude
        };
        const req = {
            productId: this.productId,
            data: value
        };
        value.images = this.imgList;
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

    markerDragEnd(m: Marker, $event: MouseEvent) {
        this.markers.splice(0, 1, {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        });
    }
    input_lat(value) {
        clearTimeout(this.keypress);
        this.keypress = setTimeout(async () => {
            value = parseFloat(value);
            this.markers[0].lat = value;
            this.latCentral = value;
            this.zoom = 14;
        }, 500);
    }
    input_lng(value) {
        clearTimeout(this.keypress);
        this.keypress = setTimeout(async () => {
            value = parseFloat(value);
            this.markers[0].lng = value;
            this.lngCentral = value;
            this.zoom = 14;
        }, 500);
    }

}
