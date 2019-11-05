import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
    keypress: any;
    products: any;
    filteredProduct = [];
    filterselect = [];
    constructor(
        private router: Router,
        private productService: ProductService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private toastr: ToastrService
    ) {

    }
    ngOnInit() {
        this.productService.getListProductsByUser().subscribe(
            next => {
                if (!next.success) return this.toastr.error('Error', 'Toastr fun!', {
                    timeOut: 3000
                });
                console.log(next.data);
                return this.products = next.data || [];
            }
        );
    }

    deletePost(id) {
        var result = confirm("Bạn có chắc chắn xóa sản phẩm này?");
        if (result === true) {
            this.productService.deleteProduct(id).subscribe((res) => {
                if (res.success) return this.toastr.success('Delete', 'Xóa thành công!', {
                    timeOut: 2000
                }),
                    window.location.reload()
                // this.router.navigate(['/list']);
                this.toastr.error(res.message, 'Error');
            });
        } else {
            console.log("NO DELTE")
        }
    }

    // deletePost(product_id) {
    //     var result = confirm("Bạn có chắc chắn xóa sản phẩm này?");
    //     if (result === true) {
    //         for (let j = 0; j < this.products.length; j++) {
    //             const product = this.products[j];
    //             if (product.product_id === product_id) {
    //                 console.log(product);
    //                 this.productService.deleteProduct(product.product_id).subscribe(() => {
    //                     console.log("delete " + product.product_id);
    //                     const indexOf = this.products.indexOf(product);
    //                     this.products.splice(indexOf, 1);
    //                     this.toastr.success('Delete', 'Xóa thành công!', {
    //                         timeOut: 2000
    //                     })
    //                     console.log("Delete");
    //                 });
    //             }
    //         }
    //     } else {
    //         console.log("NO DELTE")
    //     }
    // }



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
        this.filterselect.forEach(element => {

            if (element.type === 0) {
                let item = this.products.filter(x => x.city_id === element.value);
                if (item.length > 0) {
                    this.filteredProduct = this.filteredProduct.concat(item);
                    console.log(this.filteredProduct.length);
                }
            }
            else {
                if (this.filterselect.length === 1 && element.type === 1) {
                    clearTimeout(this.keypress);
                    this.keypress = setTimeout(async () => {
                        console.log("done");
                        this.filteredProduct = this.products.filter(x => x.product_id.toLowerCase().includes(element.value.toLowerCase()))
                    }, 500)

                } else {
                    clearTimeout(this.keypress);
                    this.keypress = setTimeout(async () => {
                        this.filteredProduct = this.filteredProduct.filter(x => x.product_id.toLowerCase().includes(element.value.toLowerCase()))
                    }, 500)
                }

            }
        });
    }
    //Detele select
    onRemoveSelect(value) {
        console.log("onremove");
        let check = this.filterselect.findIndex(x => x == value);
        return this.filterselect.splice(check, 1), console.log(this.filterselect), this.onSearch();
    }
}
