import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css'],
  providers: [HospitalService]
})
export class HospitalAddComponent implements OnInit {

  public title: string;
  public hospital: Hospital;
  public isHospitalAdd = false;

  constructor(
    private hospitalService: HospitalService
  ) {
    this.title = 'Adicionar Hospital';
    this.hospital = new Hospital(0, '');
  }

  ngOnInit(): void {
  }

  public saveHospital(): void {
    const data = {
      nombre: this.hospital.nombre,
    };
    this.hospitalService.createHospital(data)
      .subscribe(
        response => {
          console.log(response);
          this.isHospitalAdd = true;
          Swal.fire('Correcto!',  "Registro almacenado correctamente.", 'success');
        },
        error => {
          console.log(error);
          Swal.fire('Error!', error, 'error');
        });
    this.hospital = new Hospital(0, '');
  }
}
