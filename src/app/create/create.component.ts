import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

const citys = require('../../assets/JSON/citys.json');
const wards = require('../../assets/JSON/wards.json');
const districts = require('../../assets/JSON/districts.json');
const streets = require('../../assets/JSON/streets.json');
@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    constructor(
        private product: ProductService,
        private http: HttpClient,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
    ) {
        let user = localStorage.getItem('currentUser');
        user = JSON.parse(user);
        this.headers = {
            'Content-Type': 'multipart/form-data',
        };
    }
    urls = [];
    uploadForm: FormGroup;
    headers: any = {};
    keypress: any;
    cityData: any = citys;
    districtData: any = [];
    wardsData: any = [];
    streetData: any = [];
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    imgHome = [];

    // google maps zoom level
    zoom = 10;

    // initial center position for the map
    latCentral = 21.1442;
    lngCentral = 105.29310000000001;
    markers: Marker[] = [
        {
            lat: null,
            lng: null,
            draggable: true
        }
    ];

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            data_upload: [],
        });
    }

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
        if (event.target.files.length > 0) {
            const formData = new FormData();
            Object.keys(event.target.files).forEach(element => {
                const data = event.target.files[element];
                this.uploadForm.get('data_upload').setValue(data);
                formData.append('images', this.uploadForm.get('data_upload').value);
            });
            const filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.urls.push(event.target.result);
                };
                reader.readAsDataURL(event.target.files[i]);
                this.http.post<any>('http://dev.msell.com.vn/api/upload_images/product', formData).subscribe(
                    (res) => {
                        this.imgHome = res.data;
                    }, (err) => console.log(err));
            }
        }
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

        value.images = this.imgHome;
        this.product.createProduct(value)
            .subscribe(
                () => {
                    this.toastr.success('Success', 'Đăng ký thành công!', {
                        timeOut: 3000
                    });
                    this.keypress = setTimeout(async () => {
                        window.location.reload();
                    }, 3000);
                },
            );
    }

    // clickedMarker(label: string, index: number) {
    //     console.log(`clicked the marker: ${label || index}`)
    // }

    // mapClicked($event: MouseEvent) {
    //     this.markers.splice(0, 1, {
    //         lat: $event.coords.lat,
    //         lng: $event.coords.lng,
    //         draggable: true
    //     });
    //     console.log(this.markers);
    // }

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
