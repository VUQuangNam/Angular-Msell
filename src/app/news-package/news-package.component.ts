import { Component, OnInit } from '@angular/core';
import { PackageService } from '../package.service';
import { IPackage } from '../package';

@Component({
    selector: 'app-news-package',
    templateUrl: './news-package.component.html',
    styleUrls: ['./news-package.component.scss']
})
export class NewsPackageComponent implements OnInit {
    package: IPackage[] = [];
    constructor(private packageService: PackageService,
        ) { }

    ngOnInit() {
        this.packageService.getListIPackagesByUser().subscribe(
            next => {
                this.package = next;
            }
        );
        this.packageService
            .getIPackages()
            .subscribe(next => {
                this.package = next
            }, error => {
                console.log(error);
                this.package = []
            });
    }
    deletePost(i) {
        var result = confirm("Bạn có chắc chắn xóa người dùng này?");
        if (result == true) {
            for (let j = 0; j < this.package.length; j++) {
                const product = this.package[j];
                if (product.id === i) {
                    console.log(product);
                    this.packageService.deleteIPackage(product.id).subscribe(() => {
                        console.log("delete " + product.id);
                        const indexOf = this.package.indexOf(product);
                        this.package.splice(indexOf, 1);
                        alert("Delete done");
                        console.log("Delete");
                    });
                }
            }
        } else {
            console.log("NO DELTE")
        }

    }
    search(key) {
        this.package = this.package.filter(t => t.name.toLowerCase().includes(key.toLowerCase()));
        console.log("list " + this.package.length);
    }

}
