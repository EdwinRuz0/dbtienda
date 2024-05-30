import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Imagen} from 'src/app/models/model'
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private baseUrl = '/api/image'; // Reemplaza con la URL de tu backend
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }
  get refresh$() {
    return this._refresh$;
  }

  GetImagenFertilizante(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`); // Agrega el ID a la URL
  }
  // Apartado imagenes usuario
  enviarDatosBackend(datos: Imagen): Observable<any>{

    return this.http.post(this.baseUrl, datos);
  }
  getImage(references: string) {
    return this.http.get(`${this.baseUrl}/${references}`);
  }
  actualizarImage(references: string, datos: Imagen){
    const url= '/api/image/'
    return this.http.put(`${url}${references}`, datos)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  ActualizarImage(references: number, datos: Imagen){
    const url= '/api/image/'
    return this.http.put(`${url}${references}`, datos)
  }
  eliminarImage(references: string){
    const urlEliminar='/api/image/NO/';
    return this.http.delete(`${urlEliminar}${references}`);
  }

}
