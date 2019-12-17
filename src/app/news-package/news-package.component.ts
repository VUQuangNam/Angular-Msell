import { Component, OnInit } from '@angular/core';
import { PackageService } from '../package.service';
import { IPackage } from '../package';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-news-package',
    templateUrl: './news-package.component.html',
    styleUrls: ['./news-package.component.scss']
})

export class NewsPackageComponent implements OnInit {
    package: IPackage[] = [];
    keypress: any;
    constructor(
        private packageService: PackageService,
        private toastr: ToastrService
    ) { }
    ngOnInit() {
        this.packageService.getListIPackagesByUser().subscribe(
            next => {
                if (!next.success) {
                    return this.toastr.error('Error', 'Toastr fun!', {
                        timeOut: 3000
                    });
                }
                return this.package = next.data || [];
            }
        );
    }

    deletePackage(id, ix?) {
        const result = confirm('Bạn có chắc chắn xóa sản phẩm này?');
        if (result === true) {
            function checkDelete(checkdelete) {
                return checkdelete.product_id === id;
            }
            ix = this.package.findIndex(checkDelete);
            this.packageService.deleteIPackage(id).subscribe((res) => {
                if (res.success) {
                    return this.toastr.success('Delete', 'Xóa thành công!'),
                        this.package.splice(ix, 1);
                }
                this.toastr.error(res.message, 'Error');
            });
        } else {
            console.log('NO DELTE');
        }
    }
    search(key) {
        clearTimeout(this.keypress);
        this.keypress = setTimeout(async () => {
            this.package = this.package.filter(x => x.package_id.toLowerCase().includes(key.toLowerCase()));
        }, 500);
    }
}
