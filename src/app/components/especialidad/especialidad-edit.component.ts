import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/especialidad'

@Component({
  selector: 'app-especialidad-edit',
  templateUrl: './especialidad-edit.component.html',
  styleUrls: ['./especialidad-edit.component.css'],
  providers: [EspecialidadService]
})
export class EspecialidadEditComponent implements OnInit, OnDestroy {

  public title: string;
  public especialidad: Especialidad;
  public idEspecialidad: number;

  public subEspecialidadUpdate: any;
  public subEspecialidadFind: any;

  constructor(
    private especialidadService: EspecialidadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Editar especialidad';
    this.especialidad = new Especialidad(0, '', '');
    this.idEspecialidad = 0;
  }

  ngOnInit(): void {
    this.findEspecialidad();
  }

  private findEspecialidad() {
    this.subEspecialidadFind = this.route.paramMap.subscribe(params => {
      this.idEspecialidad = Number(params.get('id'));
      this.especialidadService.filterById(this.idEspecialidad)
        .subscribe(
          response => {
            this.especialidad = response;
          },
          error => {
            Swal.fire('Error!', error, 'error');
          });
    });
  }

  public updateEspecialidad(form: any): void {
    let data = {
      nombre: this.especialidad.nombre,
      descripcion: this.especialidad.descripcion
    };
    this.subEspecialidadUpdate = this.especialidadService.update(this.idEspecialidad, data)
      .subscribe(
        response => {
          Swal.fire('Correcto!',  "Registro editado correctamente.", 'success').then(
            () => this.router.navigate(['/especialidad/list'])
          );          
        },
        error => {
          Swal.fire('Error!', error, 'error');
        });
  }

  ngOnDestroy() {
    this.subEspecialidadFind.unsubscribe();
    if(this.subEspecialidadUpdate){
      this.subEspecialidadUpdate.unsubscribe();
    }
  }
}
