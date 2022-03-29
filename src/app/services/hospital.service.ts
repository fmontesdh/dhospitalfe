import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private ENDPOINT: string = GLOBAL.URL;
  private HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
  private URI_ROOT = "hospital";

  constructor(
    private http: HttpClient
  ) { }

  public getAllHospitals(): Observable<any> {
    return this.http.get(this.ENDPOINT + this.URI_ROOT).pipe(
      catchError(this.handleError)
    );
  }

  public createHospital(data: any): Observable<any> {
    return this.http.post(this.ENDPOINT + this.URI_ROOT, data,
      { headers: this.HEADERS }).pipe(
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Codigo de estado backend: ${error.status}, ` +
        `Contenido: ${JSON.stringify(error.error)}`);
    }
    return throwError(
      'Ocurrio un error, intentelo mas tarde.');
  }
}
