import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  providers: [DoctorService]
})
export class DoctorListComponent implements OnInit, OnDestroy {

  public title:string;
  public doctorList: Doctor[];

  public subDoctorAll: any;
  public subDoctorDelete: any;

  constructor(
    private doctorService: DoctorService
  ) { 
    this.title = 'Doctores';
    this.doctorList = [];
  }

  ngOnInit(): void {
    this.getAllDoctores();
  }

  public getAllDoctores(): any{
    this.subDoctorAll = this.doctorService.getAll()
    .subscribe(
      (data: any) => {
        this.doctorList = data;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');        
      }
    );
  }

  public deleteDoctorAction(id: number): void {
    if(confirm('¿Esta seguro de eliminar el registro?')){
      this.subDoctorDelete = this.doctorService.delete(id)
      .subscribe(
        response => {
          Swal.fire('Correcto!',  "Registro fue eliminado correctamente.", 'success');
          this.getAllDoctores();
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });      
    }
  }

  ngOnDestroy() {
      this.subDoctorAll.unsubscribe();
      if(this.subDoctorDelete){
        this.subDoctorDelete.unsubscribe();
      }
  }
}
