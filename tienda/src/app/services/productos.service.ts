//productos.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, Productos, Proveedores } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = '/api/producto/categoria/';
  private apiUrl2 = '/api/producto';
  private apiUrl3 = '/api/proveedor';
  private apiUrl4 = '/api/producto/proveedor/';
  constructor(private http: HttpClient, ) {
  }

  getProductos(id: any): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl + id);
  }
  getProductosAll(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl2);
  }
  getProveedores(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(this.apiUrl3);
  }
  getProductosProv(id2: any): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl4 + id2);
  }
}
