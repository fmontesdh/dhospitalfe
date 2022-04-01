import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/especialidad';


@Component({
  selector: 'app-especialidad-add',
  templateUrl: './especialidad-add.component.html',
  styleUrls: ['./especialidad-add.component.css'],
  providers: [EspecialidadService]
})
export class EspecialidadAddComponent implements OnInit, OnDestroy {

  public title: string;
  public especialidad: Especialidad;
  public isEspecialidadAdd = false;

  public subEspecialidadSave: any;

  constructor(
    private especialidadService: EspecialidadService,
    private router: Router
  ) {
    this.title = 'Adicionar especialidad';
    this.especialidad = new Especialidad(0, '', '');
  }

  ngOnInit(): void {
  }

  public saveEspecialidad(form: any): void {
    const data = {
      nombre: this.especialidad.nombre,
      descripcion: this.especialidad.descripcion
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
    if(this.subEspecialidadSave){
      this.subEspecialidadSave.unsubscribe();
    }
  }
}
