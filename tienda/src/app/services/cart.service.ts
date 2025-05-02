//productos.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoTemporal, Categoria, Productos, Proveedores } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = '/api/cart';
  private apiProductos = '/api/producto';
  private apiUrl4 = '/api/producto/proveedor/';
  private apiImagenes = '/api/imagenes';
  constructor(private http: HttpClient, ) {
  }
  getCarrito(): Observable<CarritoTemporal[]> {
    return this.http.get<CarritoTemporal[]>(this.apiUrl);
  }
  getCarritoId(id: number): Observable<CarritoTemporal> {
    return this.http.get<CarritoTemporal>(`${this.apiUrl}/${id}`);
  }
  getCarritoUsuarioId(id: number): Observable<CarritoTemporal> {
    return this.http.get<CarritoTemporal>(`${this.apiUrl}/user/${id}`);
  }
  agregarCarrito(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
  actualizarCarrito(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }
  eliminarCarrito(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiProductos);
  }
  getProductosId(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.apiProductos}/${id}`);
  }

  obtenerImagenPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiImagenes}/${id}`);
  }

}
