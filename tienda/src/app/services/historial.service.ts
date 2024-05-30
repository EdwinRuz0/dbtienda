//productos.service.ts
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario, Historial } from 'src/app/models/model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private apiUrl = '/api/producto';
  private apiUrl2 = '/api/categoria';
  private apiUrl3 = '/api/proveedor';
  private apiUrl4 = '/api/auditoria';

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  getHistorial(): Observable<Historial[]> {
    return this.http.get<Historial[]>(this.apiUrl4);
  }

}
