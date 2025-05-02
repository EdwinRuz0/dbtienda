//productos.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, Productos, Proveedores } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiProductos = '/api/producto';
  private apiUrl4 = '/api/producto/proveedor/';
  private apiImagenes = '/api/imagenes';
  constructor(private http: HttpClient, ) {
  }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiProductos);
  }
  getProductosId(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.apiProductos}/${id}`);
  }
  agregarProductos(datos: any): Observable<any> {
    return this.http.post(this.apiProductos, datos);
  }
  getProductosProv(id2: any): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl4 + id2);
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
