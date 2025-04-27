import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  esAdmi: boolean = false;
  esUsuario: boolean = false;
  roleUser: string = '';
  nameUser: string = '';
  suscription!: Subscription;
  imagePerfil: string = '';

  constructor(private user: UserService, private image: ImagenesService) {}

  ngOnInit(): void {
    this.roleUser = localStorage.getItem('userRole') || '';
    console.log('rol:', this.roleUser);

    this.nameUser = localStorage.getItem('userName') || '';
    this.imagePerfil = localStorage.getItem('imagePerfil') || '';

    if (this.roleUser === 'administrador') {
      this.esAdmi = true;
    } else if (this.roleUser === 'usuario') {
      this.esUsuario = true;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout() {
    localStorage.clear();
  }
}
