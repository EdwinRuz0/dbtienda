import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private BackendURL='/api/login';

  constructor(private http: HttpClient) { }

  enviarDatosBackend(datos: any): Observable<any>{
    return this.http.post(this.BackendURL, datos);
  }
}
