import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { NewsPackageComponent } from './news-package/news-package.component';
import { TestComponent } from './test/test.component';
import { SortComponent } from './sort/sort.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create', component: CreateComponent },
    { path: 'new', component: NewsPackageComponent },
    { path: 'test', component: TestComponent },
     { path: 'sort', component: SortComponent },



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
