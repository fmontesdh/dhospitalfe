import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HospitalListComponent } from './components/hospital/hospital-list.component';
import { HospitalAddComponent } from './components/hospital/hospital-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HospitalListComponent,
    HospitalAddComponent
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
