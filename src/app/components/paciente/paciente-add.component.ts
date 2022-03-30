import { Component, OnInit } from '@angular/core';
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
export class PacienteAddComponent implements OnInit {

  public title: string;
  public paciente: Paciente;
  public isPacienteAdd = false;
  public hospitalList: Hospital[];

  constructor(
    private pacienteService: PacienteService,
    private hospitalService: HospitalService
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
    this.hospitalService.getAll().subscribe(
      (data: any) => {
        this.hospitalList = data.content;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');
      }
    );
  }

  public savePaciente(): void {
    const data = {
      nombre: this.paciente.nombre,
      apellido: this.paciente.apellido,
      fechaNacimiento: this.paciente.fechaNacimiento,
      direccion: this.paciente.direccion,
      hospital: {
        id: this.paciente.hospital_id
      }
    };
    this.pacienteService.create(data)
      .subscribe(
        response => {
          this.isPacienteAdd = true;
          Swal.fire('Correcto!', "Registro almacenado correctamente.", 'success');
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
    this.paciente = new Paciente(0, '', '', new Date(), '', 0);
  }
}
