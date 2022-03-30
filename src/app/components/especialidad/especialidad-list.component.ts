import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/especialidad';

@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.component.html',
  styleUrls: ['./especialidad-list.component.css'],
  providers: [EspecialidadService]
})
export class EspecialidadListComponent implements OnInit {

  public title:string;
  public especialidadList: Especialidad[];

  constructor(
    private EspecialidadService: EspecialidadService
  ) { 
    this.title = 'Especialidades';
    this.especialidadList = [];
  }

  ngOnInit(): void {
    this.getAllEspecialidades();
  }

  public getAllEspecialidades(): void{
    this.EspecialidadService.getAll().subscribe(
      (data: any) => {      
        this.especialidadList = data;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');        
      }
    );
  }
}
