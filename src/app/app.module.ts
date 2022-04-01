import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HospitalListComponent } from './components/hospital/hospital-list.component';
import { HospitalAddComponent } from './components/hospital/hospital-add.component';
import { HospitalEditComponent } from './components/hospital/hospital-edit.component';
import { PacienteAddComponent } from './components/paciente/paciente-add.component';
import { PacienteListComponent } from './components/paciente/paciente-list.component';
import { PacienteEditComponent } from './components/paciente/paciente-edit.component';
import { DoctorAddComponent } from './components/doctor/doctor-add.component';
import { DoctorListComponent } from './components/doctor/doctor-list.component';
import { NotaAddComponent } from './components/nota/nota-add.component';
import { NotaListComponent } from './components/nota/nota-list.component';
import { NotaEditComponent } from './components/nota/nota-edit.component';
import { EspecialidadAddComponent } from './components/especialidad/especialidad-add.component';
import { EspecialidadListComponent } from './components/especialidad/especialidad-list.component';
import { EspecialidadEditComponent } from './components/especialidad/especialidad-edit.component';
import { DoctorEditComponent } from './components/doctor/doctor-edit.component';
import { NotaViewComponent } from './components/paciente/nota-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HospitalListComponent,
    HospitalAddComponent,
    HospitalEditComponent,
    PacienteAddComponent,
    PacienteListComponent,
    PacienteEditComponent,
    DoctorAddComponent,
    DoctorListComponent,
    NotaAddComponent,
    NotaListComponent,
    NotaEditComponent,
    EspecialidadAddComponent,
    EspecialidadListComponent,
    EspecialidadEditComponent,
    DoctorEditComponent,
    NotaViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
