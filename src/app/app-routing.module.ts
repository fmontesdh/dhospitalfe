import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HospitalAddComponent } from './components/hospital/hospital-add.component';
import { HospitalEditComponent } from './components/hospital/hospital-edit.component';
import { HospitalListComponent } from './components/hospital/hospital-list.component';
import { PacienteAddComponent } from './components/paciente/paciente-add.component';
import { PacienteEditComponent } from './components/paciente/paciente-edit.component';
import { PacienteListComponent } from './components/paciente/paciente-list.component';
import { DoctorAddComponent } from './components/doctor/doctor-add.component';
import { DoctorEditComponent } from './components/doctor/doctor-edit.component';
import { DoctorListComponent } from './components/doctor/doctor-list.component';
import { EspecialidadAddComponent } from './components/especialidad/especialidad-add.component';
import { EspecialidadEditComponent } from './components/especialidad/especialidad-edit.component';
import { EspecialidadListComponent } from './components/especialidad/especialidad-list.component';
import { NotaAddComponent } from './components/nota/nota-add.component';
import { NotaEditComponent } from './components/nota/nota-edit.component';
import { NotaListComponent } from './components/nota/nota-list.component';
import { NotaViewComponent } from './components/paciente/nota-view.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'hospital/list', component: HospitalListComponent },
    { path: 'hospital/new', component: HospitalAddComponent },
    { path: 'hospital/edit/:id', component: HospitalEditComponent },
    { path: 'paciente/list', component: PacienteListComponent },
    { path: 'paciente/new', component: PacienteAddComponent },
    { path: 'paciente/edit/:id', component: PacienteEditComponent },
    { path: 'paciente/notas/:id', component: NotaViewComponent }, 
    { path: 'doctor/list', component: DoctorListComponent },
    { path: 'doctor/new', component: DoctorAddComponent },
    { path: 'doctor/edit/:id', component: DoctorEditComponent },
    { path: 'nota/list', component: NotaListComponent },
    { path: 'nota/new', component: NotaAddComponent },
    { path: 'nota/edit/:id', component: NotaEditComponent },
    { path: 'especialidad/list', component: EspecialidadListComponent },
    { path: 'especialidad/new', component: EspecialidadAddComponent },
    { path: 'especialidad/edit/:id', component: EspecialidadEditComponent },
    { path: '**', component: HomeComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }