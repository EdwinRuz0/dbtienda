import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = '/api/categoria'; // Ajusta la URL según la configuración de tu backend

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
