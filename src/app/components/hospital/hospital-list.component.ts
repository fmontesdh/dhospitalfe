import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css'],
  providers: [HospitalService]
})
export class HospitalListComponent implements OnInit, OnDestroy {

  public title:string;
  public hospitalList: Hospital[];

  public subHospitalAll: any;

  constructor(
    private hospitalService: HospitalService
  ) { 
    this.title = 'Hospitales';
    this.hospitalList = [];
  }

  ngOnInit(): void {
    this.getAllHospitales();
  }

  public getAllHospitales(): void{
    this.subHospitalAll = this.hospitalService.getAll().subscribe(
      (data: any) => {      
        this.hospitalList = data.content;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');        
      }
    );
  }

  ngOnDestroy() {
    this.subHospitalAll.unsubscribe();
  }
}
