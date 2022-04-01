import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';

import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.css'],
  providers: [PacienteService, HospitalService]
})
export class PacienteEditComponent implements OnInit, OnDestroy {

  public title: string;
  public paciente: Paciente;
  public idPaciente: number;
  public hospitalList: Hospital[];

  public subPacienteUpdate: any;
  public subPacienteFind: any;
  public subHospitalList: any;

  constructor(
    private pacienteService: PacienteService,
    private hospitalService: HospitalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Editar paciente';
    this.paciente = new Paciente(0, '', '', new Date(), '', 1);
    this.idPaciente = 0;
    this.hospitalList = [];
  }

  ngOnInit(): void {
    this.findPaciente();
    this.loadHospitales();
  }

  private findPaciente() {
    this.subPacienteFind = this.route.paramMap.subscribe(params => {
      this.idPaciente = Number(params.get('id'));
      this.pacienteService.filterById(this.idPaciente)
        .subscribe(
          response => {
            this.paciente = response;
            this.paciente.hospital_id = response.hospital.id;
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
  
  public updatePaciente(form: any): void {
    let data = {
      nombre: this.paciente.nombre,
      apellido: this.paciente.apellido,
      fechaNacimiento: this.paciente.fechaNacimiento,
      direccion: this.paciente.direccion,
      hospital: {
        id: this.paciente.hospital_id
      }
    };
    this.subPacienteUpdate = this.pacienteService.update(this.idPaciente, data)
      .subscribe(
        response => {
          Swal.fire('Correcto!',  "Registro editado correctamente.", 'success').then(
            () => this.router.navigate(['/paciente/list'])
          );          
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
  }

  ngOnDestroy() {
    this.subPacienteFind.unsubscribe();
    this.subHospitalList.unsubscribe();
    if(this.subPacienteUpdate){
      this.subPacienteUpdate.unsubscribe();
    }
  }
}
