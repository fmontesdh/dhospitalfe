import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import { PacienteNotaDetalle } from 'src/app/models/paciente-nota-detalle';
import { NotaDetalle } from 'src/app/models/nota-detalle';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-nota-view',
  templateUrl: './nota-view.component.html',
  styleUrls: ['./nota-view.component.css'],
  providers: [PacienteService]
})
export class NotaViewComponent implements OnInit {

  public title: string;
  public paciente: PacienteNotaDetalle;
  public idPaciente: number;
  public subPacienteNotas: any;

  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.title = 'Notas de Visitas';
    this.paciente = new PacienteNotaDetalle(0,'','',new Date(),'', []);
    this.idPaciente = 0;
  }

  ngOnInit(): void {
    this.findPacienteNotas();
  }

  private findPacienteNotas() {
    this.subPacienteNotas = this.route.paramMap.subscribe(params => {
      this.idPaciente = Number(params.get('id'));
      this.pacienteService.filterPacienteNotasById(this.idPaciente)
        .subscribe(
          response => {
            this.paciente = response;           
          },
          error => {
            Swal.fire('Error!', error, 'error');
          });
    });
  }

  ngOnDestroy() {
    this.subPacienteNotas.unsubscribe();
  }
}
