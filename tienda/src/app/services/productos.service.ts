//productos.service.ts
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario, Productos } from 'src/app/models/model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = '/api/producto';
  private apiUrl2 = '/api/producto';
  private apiUrl3 = '/api/proveedor';
  private apiUrl4 = '/api/producto/proveedor/';

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl);
  }
  EnviarProducto(dato:any): Observable<any> {
    return this.http.post<any>('/api/producto', dato);
  }
  ActualizarProducto(id: number, dato:any): Observable<any> {
    const url= '/api/producto/'
    return this.http.put(`${url}${id}`, dato)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  EliminarProducto(id:number){
    const url= '/api/producto/'
    return this.http.delete(`${url}${id}`)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
