import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css'],
  providers: [HospitalService]
})
export class HospitalAddComponent implements OnInit, OnDestroy {

  public title: string;
  public hospital: Hospital;
  public isHospitalAdd = false;

  public subHospitalSave: any;

  constructor(
    private hospitalService: HospitalService,
    private router: Router
  ) {
    this.title = 'Adicionar Hospital';
    this.hospital = new Hospital(0, '');
  }

  ngOnInit(): void {
  }

  public saveHospital(form: any): void {
    const data = {
      nombre: this.hospital.nombre,
    };
    this.subHospitalSave = this.hospitalService.create(data)
      .subscribe(
        response => {
          this.isHospitalAdd = true;
          Swal.fire('Correcto!',  "Registro almacenado correctamente.", 'success').then(
            () => this.router.navigate(['/hospital/list'])
          );
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
  }

  ngOnDestroy() {
    if(this.subHospitalSave){
      this.subHospitalSave.unsubscribe();
    }
  }
}
