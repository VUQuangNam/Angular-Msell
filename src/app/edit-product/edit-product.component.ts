import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    product: Product;
    postForm: FormGroup;
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.postForm = this.fb.group({
            title: [null, [Validators.required, Validators.minLength(30)]],
            city_id: [null, Validators.required]
        });
        const id = this.route.snapshot.paramMap.get('product_id');
        this.productService.getProductById(id).subscribe(
            next => {
                this.product = next;
                this.postForm.patchValue(this.product);
            }, error => {
                console.log(error);
                this.product = null;
            }
        );
    }
    onSubmit() {
        if (this.postForm.valid) {
            const { value } = this.postForm;
            const data = {
                ...this.product,
                ...value
            };
            this.productService.updateProduct(data).subscribe(
                next => {
                    console.log("update");
                    this.router.navigate(['/list'])
                },
                error => console.log(error)
            );
        }
    }
}
