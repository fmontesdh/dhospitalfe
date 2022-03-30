import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  providers: [DoctorService]
})
export class DoctorListComponent implements OnInit {

  public title:string;
  public doctorList: Doctor[];

  constructor(
    private doctorService: DoctorService
  ) { 
    this.title = 'Doctores';
    this.doctorList = [];
  }

  ngOnInit(): void {
    this.getAllDoctores();
  }

  public getAllDoctores(): void{
    this.doctorService.getAll().subscribe(
      (data: any) => {
        this.doctorList = data;
      },
      (error: any) => {
        Swal.fire('Error!', error, 'error');        
      }
    );
  }
}
