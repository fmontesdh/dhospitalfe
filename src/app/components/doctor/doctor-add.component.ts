import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';

import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css'],
  providers: [DoctorService, HospitalService]
})
export class DoctorAddComponent implements OnInit {

  public title: string;
  public doctor: Doctor;
  public isDoctorAdd = false;
  public hospitalList: Hospital[];

  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService
  ) {
    this.title = 'Adicionar Doctor';
    this.doctor = new Doctor(0, '', '', new Date(), '', 1);
    this.hospitalList = [];
  }

  ngOnInit(): void {
    this.loadHospitales();
  }

  public loadHospitales(): void {
    this.hospitalList = [];
    this.hospitalService.getAll().subscribe(
      (data: any) => {
        this.hospitalList = data.content;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');
      }
    );
  }

  public saveDoctor(): void {
    const data = {
      nombre: this.doctor.nombre,
      apellido: this.doctor.apellido,
      fechaNacimiento: this.doctor.fechaNacimiento,
      direccion: this.doctor.direccion,
      hospital: {
        id: this.doctor.hospital_id
      }
    };
    this.doctorService.create(data)
      .subscribe(
        response => {
          this.isDoctorAdd = true;
          Swal.fire('Correcto!', "Registro almacenado correctamente.", 'success');
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
    this.doctor = new Doctor(0, '', '', new Date(), '', 0);
  }

}
