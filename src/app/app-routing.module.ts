import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { NewsPackageComponent } from './news-package/news-package.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'post', component: HomeComponent },
    { path: 'post/list', component: HomeComponent },
    { path: 'post/create', component: CreateComponent },
    { path: 'package', component: NewsPackageComponent },
    { path: 'detail/:id', component: DetailProductComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: EditProductComponent },




];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
