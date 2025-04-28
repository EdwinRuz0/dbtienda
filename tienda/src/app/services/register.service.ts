import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
