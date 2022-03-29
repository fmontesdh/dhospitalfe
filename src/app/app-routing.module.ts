import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HospitalAddComponent } from './components/hospital/hospital-add.component';
import { HospitalListComponent } from './components/hospital/hospital-list.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'hospital/list', component: HospitalListComponent },
    { path: 'hospital/new', component: HospitalAddComponent },
    { path: '**', component: HomeComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }