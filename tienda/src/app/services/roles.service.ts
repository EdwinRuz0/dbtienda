import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  
  // Guardar el ID de usuario y el rol en el LocalStorage
  setRole(userRole: string): void {
    localStorage.setItem('userRole', userRole);
  }
  setId(userId: string){
    localStorage.setItem('userId', userId);
  }

  // Recuperar el ID de usuario y el rol desde el LocalStorage
  getRole(): string  {
    const userRole = localStorage.getItem('userRole')?? '';
    return  userRole;
  }
  getId(): string{
    const userId = localStorage.getItem('userId') ?? '';
    return userId;
  }
}
