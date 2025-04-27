import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Usuario } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private BackendURL='/api/usuario';

  constructor(private http: HttpClient) { }

  enviarDatosBackend(datos: any): Observable<any>{
    return this.http.post(this.BackendURL, datos);
  }
}