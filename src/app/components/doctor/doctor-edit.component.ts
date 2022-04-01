import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';

import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/especialidad';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css'],
  providers: [DoctorService, HospitalService, EspecialidadService]
})
export class DoctorEditComponent implements OnInit, OnDestroy {

  public title: string;
  public doctor: Doctor;
  public idDoctor: number;
  public hospitalList: Hospital[];
  public especialidadList: Especialidad[];
  public especialidadSelectList: string[];

  public subDoctorUpdate: any;
  public subDoctorFind: any;
  public subHospitalList: any;
  public subEspecialidadList: any;

  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private especialidadService: EspecialidadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Editar Doctor';
    this.doctor = new Doctor(0, '', '', new Date(), '', 1);
    this.idDoctor = 0;
    this.hospitalList = [];
    this.especialidadList = [];
    this.especialidadSelectList = [];
  }

  ngOnInit(): void {
    this.findDoctor();
    this.loadHospitales();
    this.loadEspecialidades();
  }

  private findDoctor() {
    this.subDoctorFind = this.route.paramMap.subscribe(params => {
      this.idDoctor = Number(params.get('id'));
      this.doctorService.filterById(this.idDoctor)
        .subscribe(
          response => {
            this.doctor = response;
            this.doctor.hospital_id = response.hospital.id;
            this.especialidadSelectList = response.especialidades.map((esp: any) => esp.id);
          },
          error => {
            Swal.fire('Error!', error, 'error');
          });
    });
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

  public updateDoctor(form: any): void {
    let especialidadesArray = this.especialidadSelectList.map((str, index) => ({ id: str }));
    let data = {
      nombre: this.doctor.nombre,
      apellido: this.doctor.apellido,
      fechaNacimiento: this.doctor.fechaNacimiento,
      direccion: this.doctor.direccion,
      hospital: {
        id: this.doctor.hospital_id
      },
      especialidades: especialidadesArray
    };
    this.subDoctorUpdate = this.doctorService.update(this.idDoctor, data)
      .subscribe(
        response => {
          Swal.fire('Correcto!',  "Registro editado correctamente.", 'success').then(
            () => this.router.navigate(['/doctor/list'])
          );          
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
  }

  ngOnDestroy() {
    this.subDoctorFind.unsubscribe();
    this.subHospitalList.unsubscribe();
    this.subEspecialidadList.unsubscribe();
    if(this.subDoctorUpdate){
      this.subDoctorUpdate.unsubscribe();
    }
  }
}
