import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css'],
  providers: [PacienteService]
})
export class PacienteListComponent implements OnInit {

  public title:string;
  public pacienteList: Paciente[];

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
    this.pacienteService.getAll().subscribe(
      (data: any) => {      
        this.pacienteList = data.content;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');        
      }
    );
  }
}
