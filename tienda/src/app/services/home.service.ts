import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = '/api/categoria';
  private apiImagenes = '/api/imagenes';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
  agregarCategorias(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
  actualizarCategorias(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }
  eliminarCategorias(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
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

}
