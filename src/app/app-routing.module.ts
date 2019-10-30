import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { NewsPackageComponent } from './news-package/news-package.component';
import { TestComponent } from './test/test.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
    { path: 'post', component: HomeComponent },
    { path: 'post/list', component: HomeComponent },
    { path: 'post/create', component: CreateComponent },
    { path: 'new', component: NewsPackageComponent },
    { path: 'test', component: TestComponent },
    { path: 'detail/:id', component: DetailProductComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: EditProductComponent },




];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
