import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
var citys = require('../../assets/JSON/citys.json');

@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
    cityData: any = citys;
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
    ) { }

    ngOnInit() {
        this.productService.getListProductsByUser().subscribe(
            next => {
                if (!next.success) return this.toastr.error('Error', 'Toastr fun!', {
                    timeOut: 3000
                });
                return this.products = next.data || [];
            }
        );
    }

    deletePost(id, ix?) {
        var result = confirm("Bạn có chắc chắn xóa sản phẩm này?");
        if (result === true) {
            function checkDelete(checkdelete) {
                return checkdelete.product_id == id;
            }
            ix = this.products.findIndex(checkDelete);
            console.log(ix);
            this.productService.deleteProduct(id).subscribe((res) => {
                console.log(res);
                if (res.success) return this.toastr.success('Delete', 'Xóa thành công!'),
                    this.products.splice(ix, 1);
                this.toastr.error(res.message, 'Error');
            });
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
                        this.filterselect.push(obj);
                        console.log(obj);
                    } else {
                        this.filterselect.splice(check, 1);
                    }
                }
            } else {
                let obj = {
                    type: type,
                    value: value.split("_")
                }
                let check = this.filterselect.findIndex(x => x.type === type && x.value === value);
                if (check == -1) {
                    this.filterselect.push(obj);
                } else {
                    this.filterselect.splice(check, 1);
                }
            }

            //sắp xếp lại mảng select
            this.filterselect = this.filterselect.sort((a1, a2) => {
                return a1.type - a2.type;
            });
        }

        this.filterselect.forEach(element => {
            if (element.type === 0) {
                let item = this.products.filter(x => x.city_id === element.value[1]);
                if (item.length > 0) {
                    this.filteredProduct = this.filteredProduct.concat(item);
                }
            }
            else {
                if (this.filterselect.length === 1 && element.type === 1) {
                    clearTimeout(this.keypress);
                    this.keypress = setTimeout(async () => {
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
        let check = this.filterselect.findIndex(x => x == value);
        return this.filterselect.splice(check, 1), this.onSearch();
    }
}
