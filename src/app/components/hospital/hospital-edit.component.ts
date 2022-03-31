import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital'

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css'],
  providers: [HospitalService]
})
export class HospitalEditComponent implements OnInit, OnDestroy {

  public title: string;
  public hospital: Hospital;
  public idHospital: number;

  public subHospitalUpdate: any;
  public subHospitalFind: any;

  constructor(
    private hospitalService: HospitalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Editar Hospital';
    this.hospital = new Hospital(0, '');
    this.idHospital = 0;
  }

  ngOnInit(): void {
    this.findHospital();
  }

  private findHospital() {
    this.subHospitalFind = this.route.paramMap.subscribe(params => {
      this.idHospital = Number(params.get('id'));
      this.hospitalService.filterById(this.idHospital)
        .subscribe(
          response => {
            this.hospital = response;
          },
          error => {
            Swal.fire('Error!', error, 'error');
          });
    });
  }

  public updateHospital(): void {
    let data = {
      nombre: this.hospital.nombre,
    };
    this.subHospitalUpdate = this.hospitalService.update(this.idHospital, data)
      .subscribe(
        response => {
          Swal.fire('Correcto!',  "Registro editado correctamente.", 'success').then(
            () => this.router.navigate(['/hospital/list'])
          );          
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
  }

  ngOnDestroy() {
    this.subHospitalFind.unsubscribe();
    if(this.subHospitalUpdate){
      this.subHospitalUpdate.unsubscribe();
    }
  }
}
