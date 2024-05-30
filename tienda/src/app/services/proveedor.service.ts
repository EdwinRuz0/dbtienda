//productos.service.ts
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario, Proveedores } from 'src/app/models/model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = '/api/producto';
  private apiUrl2 = '/api/producto';
  private apiUrl3 = '/api/proveedor';
  private apiUrl4 = '/api/producto/proveedor/';

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getProveedores(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(this.apiUrl3);
  }
  ActualizarProveedor(id: number, dato:any): Observable<any> {
    const url= '/api/proveedor/'
    return this.http.put(`${url}${id}`, dato)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  EliminarProveedor(id:number){
    const url= '/api/proveedor/'
    return this.http.delete(`${url}${id}`)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
