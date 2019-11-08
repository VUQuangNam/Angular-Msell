import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-uploading-file',
    templateUrl: './uploading-file.component.html',
    styleUrls: ['./uploading-file.component.scss']
})
export class UploadingFileComponent implements OnInit {
    headers: any = {}
    profile = [];
    urls = []
    uploadForm: FormGroup;
    keypress: any;
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    private readonly URL = "http://dev.msell.com.vn/api/upload_images/product";
    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,

    ) {
        let user = localStorage.getItem('currentUser');
        user = JSON.parse(user);
        this.headers = {
            'Content-Type': 'multipart/form-data',
            // 'x-request-id': user['token']
        }
    }

    // fileProgress(fileInput: any) {
    //     this.fileData = <File>fileInput.target.files[0];
    //     this.preview();
    // }

    // preview() {
    //     // Show preview 
    //     var mimeType = this.fileData.type;
    //     if (mimeType.match(/image\/*/) == null) {
    //         return;
    //     }

    //     var reader = new FileReader();
    //     reader.readAsDataURL(this.fileData);
    //     reader.onload = (_event) => {
    //         this.previewUrl = reader.result;
    //     }
    //     const formData = new FormData();
    //     formData.append('file', this.fileData);
    // }
    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            data_upload: [],
        });
    }
    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const formData = new FormData();
            Object.keys(event.target.files).forEach(element => {
                const data = event.target.files[element];
                this.uploadForm.get('data_upload').setValue(data);
                formData.append('images', this.uploadForm.get('data_upload').value);
            });
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event: any) => {
                    this.urls.push(event.target.result);
                    console.log(event.target.result);

                }
                reader.readAsDataURL(event.target.files[i]);
                // this.httpClient.post<any>(this.URL, formData).subscribe(
                //     (res) => {
                //         console.log(res);
                //     }, (err) => console.log(err)
                // );
            }
        }
    }
}
