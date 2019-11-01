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
        this.registerForm = this.fb.group({
            productcode: [null, [Validators.required, Validators.minLength(6)]],
            city: [null, [Validators.required, Validators.minLength(6)]],
        })
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        console.log(this.registerForm);
        if (this.registerForm.invalid) {
            return;
        }
        console.log(this.registerForm.value);
        this.product.createProduct(this.registerForm.value)
            .subscribe(
                data => {
                    console.log('succsess');
                    alert("Đăng ký thành công!!");
                    window.location.reload();
                },
            );
    }
}
