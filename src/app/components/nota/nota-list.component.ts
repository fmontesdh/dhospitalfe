import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { NotaService } from 'src/app/services/nota.service';
import { Nota } from 'src/app/models/nota';

@Component({
  selector: 'app-nota-list',
  templateUrl: './nota-list.component.html',
  styleUrls: ['./nota-list.component.css'],
  providers: [NotaService]
})
export class NotaListComponent implements OnInit {

  public title:string;
  public notaList: Nota[];

  constructor(
    private NotaService: NotaService
  ) { 
    this.title = 'Notas de Vista';
    this.notaList = [];
  }

  ngOnInit(): void {
    this.getAllNotas();
  }

  public getAllNotas(): void{
    this.NotaService.getAll().subscribe(
      (data: any) => {      
        this.notaList = data.content;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');        
      }
    );
  }

}
