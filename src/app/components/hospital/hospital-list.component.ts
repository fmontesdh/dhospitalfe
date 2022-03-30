import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from 'src/app/models/hospital';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css'],
  providers: [HospitalService]
})
export class HospitalListComponent implements OnInit {

  public title:string;
  public hospitalList: Hospital[];

  constructor(
    private hospitalService: HospitalService
  ) { 
    this.title = 'Hospitales';
    this.hospitalList = [];
  }

  ngOnInit(): void {
    this.getAllHospitales();
  }

  public getAllHospitales(): void{
    this.hospitalService.getAll().subscribe(
      (data: any) => {      
        this.hospitalList = data.content;
      },
      (error: any) => {
        console.log(error);        
      }
    );
  }
}
