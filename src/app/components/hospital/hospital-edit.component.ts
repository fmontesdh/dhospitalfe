import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital'

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css'],
  providers: [HospitalService]
})
export class HospitalEditComponent implements OnInit {

  public title: string;
  public hospital: Hospital;
  public idHospital: number;


  constructor(
    private hospitalService: HospitalService,
    private route: ActivatedRoute
  ) {
    this.title = 'Editar Hospital';
    this.hospital = new Hospital(0, '');
    this.idHospital = 0;
  }

  ngOnInit(): void {
    this.findHospital();
  }

  private findHospital() {
    this.route.paramMap.subscribe(params => {
      this.idHospital = Number(params.get('id'));
      this.hospitalService.filterById(this.idHospital)
        .subscribe(
          response => {
            this.hospital = response;
            // console.log(this.hospital);
          },
          error => {
            console.log(error);
          });
    });
  }

  public updateHospital(): void {
    let data = {
      nombre: this.hospital.nombre,
    };
    this.hospitalService.update(this.idHospital, data)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire('Correcto!', response.message, 'success');
        },
        error => {
          console.log(error);
          Swal.fire('Error!', error, 'error');
        });
  }  
}