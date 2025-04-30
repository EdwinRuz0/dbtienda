import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedores } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiProveedor = '/api/proveedor';
  private apiImagenes = '/api/imagenes';
  constructor(private http: HttpClient, ) {
  }
  getProveedores(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(this.apiProveedor);
  }
  agregarProveedores(datos: any): Observable<any> {
    return this.http.post(this.apiProveedor, datos);
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
