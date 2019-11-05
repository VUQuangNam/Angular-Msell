import { Component, OnInit, } from '@angular/core';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    keypress: any;
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    constructor(
        private product: ProductService,
        private http: HttpClient,
        private toastr: ToastrService
    ) { }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
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
    ngOnInit() {
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
