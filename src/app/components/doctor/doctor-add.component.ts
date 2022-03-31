import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/especialidad';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css'],
  providers: [DoctorService, HospitalService, EspecialidadService]
})
export class DoctorAddComponent implements OnInit, OnDestroy {

  public title: string;
  public doctor: Doctor;
  public isDoctorAdd = false;
  public hospitalList: Hospital[];
  public especialidadList: Especialidad[];
  public especialidadSelectList: string[];

  public subDoctorSave: any;
  public subHospitalList: any;
  public subEspecialidadList: any;

  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private especialidadService: EspecialidadService,
    private router: Router
  ) {
    this.title = 'Adicionar Doctor';
    this.doctor = new Doctor(0, '', '', new Date(), '', 1);
    this.hospitalList = [];
    this.especialidadList = [];
    this.especialidadSelectList = [];
  }

  ngOnInit(): void {
    this.loadHospitales();
    this.loadEspecialidades();
  }

  public loadHospitales(): void {
    this.hospitalList = [];
    this.subHospitalList = this.hospitalService.getAll().subscribe(
      (data: any) => {
        this.hospitalList = data.content;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');
      }
    );
  }

  public loadEspecialidades(): void {
    this.especialidadList = [];
    this.subEspecialidadList = this.especialidadService.getAll().subscribe(
      (data: any) => {    
        this.especialidadList = data;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');
      }
    );
  }

  public saveDoctor(): void { 
    let especialidadesArray = this.especialidadSelectList.map((str, index) => ({ id: str }));   
    const data = {
      nombre: this.doctor.nombre,
      apellido: this.doctor.apellido,
      fechaNacimiento: this.doctor.fechaNacimiento,
      direccion: this.doctor.direccion,
      hospital: {
        id: this.doctor.hospital_id
      },
      especialidades: especialidadesArray
    };

    this.subDoctorSave = this.doctorService.create(data)
      .subscribe(
        response => {
          this.isDoctorAdd = true;
          Swal.fire('Correcto!', "Registro almacenado correctamente.", 'success').then(
            () => this.router.navigate(['/doctor/list'])
          );
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
    this.doctor = new Doctor(0, '', '', new Date(), '', 0);
    this.especialidadSelectList = [];
  }

  ngOnDestroy() {
    this.subHospitalList.unsubscribe();
    this.subEspecialidadList.unsubscribe();
    if(this.subDoctorSave){
      this.subDoctorSave.unsubscribe();
    }
  }
}
