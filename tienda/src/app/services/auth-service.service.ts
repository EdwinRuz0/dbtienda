import { Injectable } from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn = false;
  constructor(private user: UserService, private router:Router, private http: HttpClient){}

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  // Método para obtener el tiempo que dura el token
  getTokenExpirationTime(token: string): string {
    const decodedToken = this.decodeToken(token);

    if (decodedToken && decodedToken.exp) {
      const expirationTime = decodedToken.exp * 1000; // Convertir segundos a milisegundos
      const currentTime = new Date().getTime();
      const timeDifference = expirationTime - currentTime;

      // Calcular horas, minutos y segundos
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return `${hours} horas, ${minutes} minutos y ${seconds} segundos`;
    }

    return 'Tiempo de expiración no disponible';
  }

  // Método para decodificar el token JWT
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
  getToken(): string | null {
    return this.user.getToken();
  }

  // Método para renovar el token
  refreshToken(token: string): Observable<any> {
    if (!token) {
      // Si no hay token almacenado, emitir un error indicando que no se encontró ningún token
      return throwError('No se encontró ningún token para renovar');
    }

    // Solicitar un nuevo token al servidor
    return this.http.post<any>('/api/user/refreshToken', { token }).pipe(
      catchError(error => {
        // Manejar errores de la solicitud de renovación de token
        return throwError('Error al renovar el token');
      })
    );
  }
  // Método para verificar si el token ha caducado
  isTokenExpired(token: string): boolean {
    const tokenPayload = this.decodeToken(token);
    if (tokenPayload && tokenPayload.exp) {
      const expirationTime = tokenPayload.exp * 1000; // Convertir segundos a milisegundos
      const currentTime = new Date().getTime();
      return expirationTime < currentTime;
    }
    return true; // Si no hay marca de tiempo de expiración o si el token no es válido, se considera caducado
  }

  isAuthenticated(): boolean {
    const token = this.user.getToken();
    // Devuelve true si el token existe y no está caducad
    return !!token;
  }
  // Obtener la fecha de expiración del token
  getTokenExpiration(token: string): number {
    
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    return tokenPayload.exp; // Convertir a milisegundos
  }
  // Método para obtener el ID de usuario, rol e ID de imagen del token
  getUserInfoFromToken(token: string): { userId: string, role: string, imageId: string } | null {
    const decodedToken = this.decodeToken(token);
    console.log('token encontrado');
    console.log(decodedToken);
    
    
    if (decodedToken) {
      console.log('entrando en el ciclo if');
      
      return {
        userId: decodedToken.id,
        role: decodedToken.role,
        imageId: decodedToken.imageId
      };
    }
    return null;
  }
  getRoleUser(token: string){
    const decodedToken =this.decodeToken(token)

    return decodedToken.role;
  }
  getIdUser(token: string){
    const decodedToken =this.decodeToken(token)

    return decodedToken.id;
  }
  getimageIdUser(token: string){
    const decodedToken =this.decodeToken(token)

    return decodedToken.imageId;
  }
  getiNameUser(token: string){
    const decodedToken =this.decodeToken(token)

    return decodedToken.name;
  }
}
