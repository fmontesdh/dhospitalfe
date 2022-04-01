import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css'],
  providers: [PacienteService]
})
export class PacienteListComponent implements OnInit, OnDestroy {

  public title:string;
  public pacienteList: Paciente[];

  public subPacienteAll: any;
  public subPacienteDelete: any;

  constructor(
    private pacienteService: PacienteService
  ) { 
    this.title = 'Pacientes';
    this.pacienteList = [];
  }

  ngOnInit(): void {
    this.getAllPacientes();
  }

  public getAllPacientes(): void{
    this.subPacienteAll = this.pacienteService.getAll().subscribe(
      (data: any) => {      
        this.pacienteList = data.content;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');        
      }
    );
  }

  public deletePacienteAction(id: number): void {
    if(confirm('¿Esta seguro de eliminar el registro?')){
      this.subPacienteDelete = this.pacienteService.delete(id)
      .subscribe(
        response => {
          Swal.fire('Correcto!',  "Registro fue eliminado correctamente.", 'success');
          this.getAllPacientes();
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });      
    }
  }

  ngOnDestroy() {
    this.subPacienteAll.unsubscribe();
    if(this.subPacienteDelete){
      this.subPacienteDelete.unsubscribe();
    }
  }
}
