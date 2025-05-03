//cart.service.ts
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
  private apiImagenes = '/api/imagenes';
  private comprasUrl = '/api/compra';
  private detallesCompraUrl = '/api/Detallescompra';
  private ventasUrl = '/api/venta';
  private detallesVentasUrl = '/api/detallesVenta';
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
  eliminarTodoCarritoUsuario(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/vaciar/${id}`);
  }
  agregarCompras(datos: any): Observable<any> {
    return this.http.post(this.comprasUrl, datos); 
  }
  agregarDetallesCompra(datos: any): Observable<any> {
    return this.http.post(this.detallesCompraUrl, datos); 
  }
  agregarVentas(datos: any): Observable<any> {
    return this.http.post(this.ventasUrl, datos); 
  }
  agregarDetallesVentas(datos: any): Observable<any> {
    return this.http.post(this.detallesVentasUrl, datos); 
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
