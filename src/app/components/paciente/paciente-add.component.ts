import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-paciente-add',
  templateUrl: './paciente-add.component.html',
  styleUrls: ['./paciente-add.component.css'],
  providers: [PacienteService, HospitalService]
})
export class PacienteAddComponent implements OnInit, OnDestroy {

  public title: string;
  public paciente: Paciente;
  public isPacienteAdd = false;
  public hospitalList: Hospital[];

  public subPacienteSave: any;
  public subHospitalList: any;

  constructor(
    private pacienteService: PacienteService,
    private hospitalService: HospitalService,
    private router: Router
  ) {
    this.title = 'Adicionar Paciente';
    this.paciente = new Paciente(0, '', '', new Date(), '', 1);
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

  public savePaciente(form: any): void {
    const data = {
      nombre: this.paciente.nombre,
      apellido: this.paciente.apellido,
      fechaNacimiento: this.paciente.fechaNacimiento,
      direccion: this.paciente.direccion,
      hospital: {
        id: this.paciente.hospital_id
      }
    };
    this.subPacienteSave = this.pacienteService.create(data)
      .subscribe(
        response => {
          this.isPacienteAdd = true;
          Swal.fire('Correcto!', "Registro almacenado correctamente.", 'success').then(
            () => this.router.navigate(['/paciente/list'])
          );
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
  }

  ngOnDestroy() {
    this.subHospitalList.unsubscribe();
    if(this.subPacienteSave){
      this.subPacienteSave.unsubscribe();
    }
  }
}
