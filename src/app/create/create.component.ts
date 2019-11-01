import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    registerForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private product: ProductService
    ) { }

    ngOnInit() {

    }

    get f() { return this.registerForm.controls; }

    onSubmit(data) {
        if (data.invalid) return alert("error validate");
        let { value } = data
        this.product.createProduct(value)
            .subscribe(
                data => {
                    console.log('succsess');
                    alert("Đăng ký thành công!!");
                    window.location.reload();
                },
            );
    }
}
