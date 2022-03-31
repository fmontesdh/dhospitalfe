import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private ENDPOINT: string = GLOBAL.URL;
  private HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
  private URI_ROOT = "doctor";

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<any> {
    return this.http.get(this.ENDPOINT + this.URI_ROOT).pipe(
      catchError(this.handleError)
    );
  }

  public create(data: any): Observable<any> {
    return this.http.post(this.ENDPOINT + this.URI_ROOT, data,
      { headers: this.HEADERS }).pipe(
        catchError(this.handleError)
      );
  }

  public filterById(id: number): Observable<any> {
    return this.http.get(`${this.ENDPOINT}${this.URI_ROOT}/especialidades/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.ENDPOINT}${this.URI_ROOT}/${id}`,
      data, { headers: this.HEADERS }).pipe(
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
