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
import { DataTableModule } from 'ng-angular8-datatable';
import { HearderComponent } from './hearder/hearder.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { TestComponent } from './test/test.component';
import { SortComponent } from './sort/sort.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NewsPackageComponent } from './news-package/news-package.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';

//ng-bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        HomeComponent,
        ListDetailComponent,
        CreateComponent,
        HearderComponent,
        NewsPackageComponent,
        TestComponent,
        SortComponent,
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
        NgbPaginationModule,
        NgbAlertModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
