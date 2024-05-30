//productos.service.ts
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario, Categoria } from 'src/app/models/model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = '/api/producto';
  private apiUrl2 = '/api/categoria';
  private apiUrl3 = '/api/proveedor';
  private apiUrl4 = '/api/producto/proveedor/';

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl2);
  }
  EnviarCategoria(dato:any): Observable<any> {
    return this.http.post<any>('/api/categoria', dato);
  }
  ActualizarCategoria(id: number, dato:any): Observable<any> {
    const url= '/api/categoria/'
    return this.http.put(`${url}${id}`, dato)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  EliminarCategoria(id:number){
    const url= '/api/categoria/'
    return this.http.delete(`${url}${id}`)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
