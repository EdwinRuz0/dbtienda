//history.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoTemporal, Categoria, DetalleCompras, DetalleVentas, Productos, Proveedores, Ventas } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiProductos = '/api/producto';
  private ventasUrl = '/api/venta';
  private detallesVentasUrl = '/api/detallesVenta';
  private apiImagenes = '/api/imagenes';
  constructor(private http: HttpClient, ) {
  }
  getVentas(): Observable<Ventas[]> {
    return this.http.get<Ventas[]>(this.ventasUrl);    
  }
  getVentasId(id: number): Observable<Ventas> {
    return this.http.get<Ventas>(`${this.ventasUrl}/${id}`);
  }
  getVentasByUserId(id: number): Observable<Ventas[]> {
    return this.http.get<Ventas[]>(`${this.ventasUrl}/user/${id}`);
  }
  getDetallesVentas(): Observable<DetalleVentas[]> {
    return this.http.get<DetalleVentas[]>(this.detallesVentasUrl);    
  }
  getDetallesVentasId(id: number): Observable<DetalleVentas> {
    return this.http.get<DetalleVentas>(`${this.detallesVentasUrl}/${id}`);
  }
  getDetallesVentasByVentaId(id: number): Observable<DetalleVentas[]> {
    return this.http.get<DetalleVentas[]>(`${this.detallesVentasUrl}/venta/${id}`);
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
