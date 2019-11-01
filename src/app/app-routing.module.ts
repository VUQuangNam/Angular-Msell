import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { NewsPackageComponent } from './news-package/news-package.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ViewsComponent } from './views/views.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', component: ViewsComponent,
        //  canActivate: [AuthGuard],
        children: [
            { path: 'list', component: ListDetailComponent },
            { path: 'package', component: NewsPackageComponent },
            { path: 'create', component: CreateComponent },
            { path: 'edit/product/:id', component: EditProductComponent },
            { path: 'detail/:id', component: DetailProductComponent }
        ]
    },
    { path: 'login', component: SignInComponent },
    { path: 'register', component: RegisterComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
