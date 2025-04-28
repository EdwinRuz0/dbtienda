import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiImagenes = '/api/imagenes';
  private apiUsuarios = '/api/usuario';

  constructor(private http: HttpClient) {}

  enviarDatosImagen(datos: any): Observable<any> {
    return this.http.post(this.apiImagenes, datos);
  }

  obtenerImagenPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiImagenes}/${id}`);
  }

  actualizarImagen(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiImagenes}/${id}`, datos);
  }

  eliminarImagen(id: number): Observable<any> {
    return this.http.delete(`${this.apiImagenes}/${id}`);
  }

  actualizarUsuario(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUsuarios}/${id}`, datos);
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUsuarios}/${id}`);
  }
}
