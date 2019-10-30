import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { async } from '@angular/core/testing';


@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
    keypress: any;
    products = [];
    filteredProduct = [];
    filterselect = [];
    constructor(
        private router: Router,
        private productService: ProductService,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.productService.getListProductsByUser().subscribe(
            next => {
                this.products = next;
            }
        );
        this.productService
            .getProducts()
            .subscribe(next => {
                this.filteredProduct = next
            }, error => {
                console.log(error);
                this.filteredProduct = []
            });
    }

    deletePost(i) {
        var result = confirm("Bạn có chắc chắn xóa sản phẩm này?");
        if (result == true) {
            for (let j = 0; j < this.filteredProduct.length; j++) {
                const product = this.filteredProduct[j];
                if (product.id === i) {
                    console.log(product);
                    this.productService.deleteProduct(product.id).subscribe(() => {
                        console.log("delete " + product.id);
                        const indexOf = this.filteredProduct.indexOf(product);
                        this.filteredProduct.splice(indexOf, 1);
                        alert("Delete done");
                        console.log("Delete");
                    });
                }
            }
        } else {
            console.log("NO DELTE")
        }
    }
    //Search
    onSearch(type?: number, value?: any) {
        this.filteredProduct = [];
        if (value) {
            if (type === 1) {
                let index = this.filterselect.findIndex(x => x.type === 1)
                if (index !== -1) {
                    this.filterselect[index].value = value;
                } else {
                    let obj = {
                        type: type,
                        value: value
                    }
                    let check = this.filterselect.findIndex(x => x.type === type && x.value === value);
                    if (check == -1) {
                        console.log(this.filterselect);
                        this.filterselect.push(obj);
                    } else {
                        this.filterselect.splice(check, 1);
                    }
                }
            } else {
                let obj = {
                    type: type,
                    value: value
                }
                let check = this.filterselect.findIndex(x => x.type === type && x.value === value);
                if (check == -1) {
                    this.filterselect.push(obj);
                } else {
                    this.filterselect.splice(check, 1);
                }
            }
            this.filterselect = this.filterselect.sort((a1, a2) => {
                return a1.type - a2.type;
            });
        }
        console.log(value, "no-set");
        this.filterselect.forEach(element => {
            if (this.filterselect.length === 1 && element.type === 1) {
                clearTimeout(this.keypress);
                this.keypress = setTimeout(async () => {
                    console.log(element.value, "time_out");
                    this.filteredProduct = this.products.filter(x => x.productcode.toLowerCase().includes(element.value.toLowerCase()))
                }, 500)

            }
            if (element.type === 0) {
                let item = this.products.filter(x => x.city === element.value);
                if (item.length > 0) {
                    this.filteredProduct = this.filteredProduct.concat(item);
                    console.log(this.filteredProduct.length);
                }
            }
            else {
                clearTimeout(this.keypress);
                this.keypress = setTimeout(async () => {
                    console.log(element.value, "time_out");
                    this.filteredProduct = this.filteredProduct.filter(x => x.productcode.toLowerCase().includes(element.value.toLowerCase()))
                }, 500)
            }
            // for (let index = 0; index < this.filterselect.length; index++) {
            //     if (element.type !== 0) {
            //         this.filteredProduct = this.filteredProduct.filter(z => z.productcode.toLowerCase().includes(element.value.toLowerCase()))
            //     }
            // }
            // for (let index = 0; index < this.filterselect.length; index++) {
            //     if (element.type === 0) {
            //         let item = this.products.filter(x => x.city === element.value);
            //         if (item.length > 0) {
            //             this.filteredProduct = this.filteredProduct.concat(item);
            //             console.log(this.filteredProduct.length);
            //         }
            //     } else {
            //         if (this.filteredProduct.length === 0) {
            //             this.filteredProduct = this.products.filter(z => z.productcode.toLowerCase().includes(element.value.toLowerCase()))
            //         } else {
            //             this.filteredProduct = this.filteredProduct.filter(z => z.productcode.toLowerCase().includes(element.value.toLowerCase))
            //         }
            //     }

            // if (element.type === 0) {
            //     if (this.filteredProduct.length > 0) {
            //         this.filteredProduct = this.filteredProduct.filter(x => x.city === element.value);
            //     } else {
            //         let item = this.products.filter(x => x.city === element.value);
            //         if (item.length > 0) {
            //             this.filteredProduct = this.filteredProduct.concat(item)
            //         }
            //     }
            // } else {
            //     if (this.filteredProduct.length === 0) {
            //         this.filteredProduct = this.products.filter(z => z.productcode.toLowerCase().includes(element.value.toLowerCase()))
            //     } else {
            //         this.filteredProduct = this.filteredProduct.filter(z => z.productcode.toLowerCase().includes(element.value.toLowerCase()));
            //     }
            // }

        });
    }
    //Detele select
    onRemoveSelect(value) {
        console.log("onremove");
        let check = this.filterselect.findIndex(x => x == value);
        return this.filterselect.splice(check, 1), console.log(this.filterselect), this.onSearch()
            ;
    }
}
