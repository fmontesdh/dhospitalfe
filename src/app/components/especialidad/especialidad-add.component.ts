import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/especialidad';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-especialidad-add',
  templateUrl: './especialidad-add.component.html',
  styleUrls: ['./especialidad-add.component.css'],
  providers: [EspecialidadService, HospitalService]
})
export class EspecialidadAddComponent implements OnInit, OnDestroy {

  public title: string;
  public especialidad: Especialidad;
  public isEspecialidadAdd = false;
  public hospitalList: Hospital[];

  public subEspecialidadSave: any;
  public subHospitalList: any;

  constructor(
    private especialidadService: EspecialidadService,
    private hospitalService: HospitalService,
    private router: Router
  ) {
    this.title = 'Adicionar especialidad';
    this.especialidad = new Especialidad(0, '', '', 1);
    this.hospitalList = [];
  }

  ngOnInit(): void {
    this.loadHospitales();
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

  public saveEspecialidad(form: any): void {
    const data = {
      nombre: this.especialidad.nombre,
      descripcion: this.especialidad.descripcion,
      hospital: {
        id: this.especialidad.hospital_id
      }
    };
    this.subEspecialidadSave = this.especialidadService.create(data)
      .subscribe(
        response => {
          this.isEspecialidadAdd = true;
          Swal.fire('Correcto!', "Registro almacenado correctamente.", 'success').then(
            () => this.router.navigate(['/especialidad/list'])
          );
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
  }

  ngOnDestroy() {
    this.subHospitalList.unsubscribe();
    if(this.subEspecialidadSave){
      this.subEspecialidadSave.unsubscribe();
    }
  }
}
