import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  imagenPerfilBase64: string = '';
  nombreImagen: string = '';
  extensionImagen: string = '';
  userImageId: number | null = null;
  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [''],
      primer_apellido: [''],
      segundo_apellido: [''],
      rol: [''],
      direccion: [''],
      telefono: [''],
      correo: ['']
    });

    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.perfilService.obtenerUsuarioPorId(Number(userId)).subscribe({
      next: async (user) => {
        this.perfilForm.patchValue({
          nombre: user.UserName || '',
          primer_apellido: user.PrimerApellido || '',
          segundo_apellido: user.SegundoApellido || '',
          rol: user.Rol || '',
          direccion: user.Direccion || '',
          telefono: user.Telefono || '',
          correo: user.CorreoElectronico || '',
          imagenPerfilBase64: user.ImagenID || ''
        });
        this.userImageId = user.ImagenID || null;
        if(this.userImageId) {
          const response = await this.perfilService.obtenerImagenPorId(this.userImageId).toPromise();
          this.imagenPerfilBase64 = response.DataBase64 || '';
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del usuario', error);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPerfilBase64 = reader.result as string;
        this.nombreImagen = file.name.split('.')[0] || 'perfil_' + Date.now();
        this.extensionImagen = file.name.split('.').pop() || 'png';
      };
      reader.readAsDataURL(file);
    }
  }

  async eliminarFoto() {
    this.imagenPerfilBase64 = '';
    this.nombreImagen = '';
    this.extensionImagen = '';
    if (this.userImageId) {
      await this.perfilService.actualizarUsuario(Number(localStorage.getItem('userId')), { ImagenID: null }).toPromise();
      await this.perfilService.eliminarImagen(this.userImageId).toPromise();
      Swal.fire({
        icon: 'info',
        title: 'Imagen Eliminada',
        text: 'La imagen de perfil ha sido eliminada.',
        confirmButtonColor: '#3498db'
      });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No tienes una imagen que eliminar.',
        confirmButtonColor: '#e74c3c'
      });
    }
  }

  async actualizarPerfil() {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('No se encontró el ID del usuario en el localStorage');
      }
      const user = await this.perfilService.obtenerUsuarioPorId(Number(userId)).toPromise();
      if (!user) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el perfil.',
          confirmButtonColor: '#e74c3c'
        });
      }
      if (user.ImagenID== null || undefined) {
        console.log("nueva imagen");
        if (this.imagenPerfilBase64 && this.nombreImagen && this.extensionImagen) {
          const imagenData = {
            NombreImagen: this.nombreImagen,
            Extension: this.extensionImagen,
            DataBase64: this.imagenPerfilBase64,
            Referencia: 'perfil_usuario'
          };
          const response = await this.perfilService.enviarDatosImagen(imagenData).toPromise();
          this.userImageId = response.ImagenID;
        }
          const datosActualizados = {
            UserName: this.perfilForm.value.nombre || '',
            PrimerApellido: this.perfilForm.value.primer_apellido || '',
            SegundoApellido: this.perfilForm.value.segundo_apellido || '',
            rol: this.perfilForm.value.rol || '',
            Direccion: this.perfilForm.value.direccion || '',
            Telefono: this.perfilForm.value.telefono || '',
            CorreoElectronico: this.perfilForm.value.correo || '',
            ImagenID: this.userImageId
          };
          await this.perfilService.actualizarUsuario(Number(userId), datosActualizados).toPromise();
          localStorage.setItem('userName', this.perfilForm.value.nombre || '');
          Swal.fire({
            icon: 'success',
            title: 'Perfil Actualizado',
            text: 'Tus cambios se guardaron exitosamente.',
            confirmButtonColor: '#28a745'
          });
      }else {
        console.log("imagen existente");
        this.userImageId = user.ImagenID;
        if (this.imagenPerfilBase64 && this.nombreImagen && this.extensionImagen) {
          const imagenData = {
            NombreImagen: this.nombreImagen,
            Extension: this.extensionImagen,
            DataBase64: this.imagenPerfilBase64,
            Referencia: 'perfil_usuario'
          };
          await this.perfilService.actualizarImagen(this.userImageId!, imagenData).toPromise();
        }
        const datosActualizados = {
          UserName: this.perfilForm.value.nombre || '',
          PrimerApellido: this.perfilForm.value.primer_apellido || '',
          SegundoApellido: this.perfilForm.value.segundo_apellido || '',
          rol: this.perfilForm.value.rol || '',
          Direccion: this.perfilForm.value.direccion || '',
          Telefono: this.perfilForm.value.telefono || '',
          CorreoElectronico: this.perfilForm.value.correo || '',
          ImagenID: this.userImageId
        };
        await this.perfilService.actualizarUsuario(Number(userId), datosActualizados).toPromise();
        localStorage.setItem('userName', this.perfilForm.value.nombre || '');
        Swal.fire({
          icon: 'success',
          title: 'Perfil Actualizado',
          text: 'Tus cambios se guardaron exitosamente.',
          confirmButtonColor: '#28a745'
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el perfil.',
        confirmButtonColor: '#e74c3c'
      });
    }
  }
}
