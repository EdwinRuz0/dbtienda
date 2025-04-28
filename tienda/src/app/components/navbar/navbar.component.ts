import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  esAdmin: boolean = false;
  userName: string = '';
  menuAbierto: boolean = false;
  imagenPerfilBase64: string = '';
  userImageId: number | null = null;

  @ViewChild('userMenu', { static: false }) userMenu!: ElementRef;

  constructor(private perfilService: PerfilService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    this.userName = localStorage.getItem('userName') || 'Perfil';
    this.esAdmin = role === 'administrador';

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.perfilService.obtenerUsuarioPorId(Number(userId)).subscribe({
        next: (user) => {
          this.userImageId = user.ImagenID || null;

          if (this.userImageId) {
            this.perfilService.obtenerImagenPorId(this.userImageId).subscribe({
              next: (imagen) => {
                this.imagenPerfilBase64 = imagen.DataBase64 || '';
              },
              error: (error) => {
                console.error('Error al cargar la imagen', error);
              }
            });
          }
        },
        error: (error) => {
          console.error('Error al cargar datos del usuario', error);
        }
      });
    }
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarSesion() {
    localStorage.clear();
    window.location.href = '/';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.menuAbierto = false;
    }
  }
}
