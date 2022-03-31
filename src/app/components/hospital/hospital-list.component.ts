import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public subHospitalDelete: any;

  constructor(
    private hospitalService: HospitalService,
    private router: Router
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

  public deleteHospitalAction(id: number): void {
    if(confirm('¿Esta seguro de eliminar el registro?')){
      this.subHospitalDelete = this.hospitalService.delete(id)
      .subscribe(
        response => {
          Swal.fire('Correcto!',  "Registro fue eliminado correctamente.", 'success');
          this.getAllHospitales();
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
      
    }
  }

  ngOnDestroy() {
    this.subHospitalAll.unsubscribe();
    if(this.subHospitalDelete){
      this.subHospitalDelete.unsubscribe();
    }
  }
}
