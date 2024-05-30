import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from 'src/app/models/model';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api'; // La URL base de tu API
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  private getHeaders(token: any) {
    let authToken = token

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return { headers };
  }

  getUserDataById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
    
  }

  actualizarUsuario(userId: string, data: any) {
    return this.http.put(`${this.apiUrl}/user/${userId}`, data)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  updateRole(id: any, data: any, token: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/updateRole/' + id, data, this.getHeaders(token));
  }

  getAll(token: any): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, this.getHeaders(token));
  }
  // Método para almacenar el token en el localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para eliminar el token del localStorage
  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  // Método para comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Devuelve true si el token existe y no está caducado
    return !!token;
  }
  
}
