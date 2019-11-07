import { Component, OnInit, } from '@angular/core';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
var citys = require('../../assets/JSON/citys.json');
var wards = require('../../assets/JSON/wards.json');
var districts = require('../../assets/JSON/districts.json');
var streets = require('../../assets/JSON/streets.json');
@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {
    keypress: any;
    cityData: any = citys;
    districtData: any = [];
    wardsData: any = [];
    streetData: any = [];
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    constructor(
        private product: ProductService,
        private http: HttpClient,
        private toastr: ToastrService,
    ) {
    }


    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
    }

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
            // case 3:
            //     this.streetData = streets.find(x => x.code === value).streets;
            //     break;
            default:
                break;
        }
    }

    preview() {
        // Show preview 
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
        }
        const formData = new FormData();
        formData.append('file', this.fileData);
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
        value.images = [
            data.value.images,
        ]
        this.product.createProduct(value)
            .subscribe(
                data => {
                    console.log(data);
                    this.toastr.success('Success', 'Đăng ký thành công!', {
                        timeOut: 3000
                    });
                    this.keypress = setTimeout(async () => {
                        window.location.reload();
                    }, 3000)
                },
            );
    }
}
