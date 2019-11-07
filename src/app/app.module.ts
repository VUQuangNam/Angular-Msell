import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { DataTableModule } from 'angular-6-datatable';
import { HearderComponent } from './hearder/hearder.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NewsPackageComponent } from './news-package/news-package.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { ViewsComponent } from './views/views.component';
import { ToastrModule } from 'ngx-toastr';
import { TestMapComponent } from './test-map/test-map.component';


@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        HomeComponent,
        ListDetailComponent,
        CreateComponent,
        HearderComponent,
        NewsPackageComponent,
        DetailProductComponent,
        EditProductComponent,
        SignInComponent,
        RegisterComponent,
        ViewsComponent,
        TestMapComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        DataTableModule,
        MatSortModule,
        NgbModule,
        ToastrModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
