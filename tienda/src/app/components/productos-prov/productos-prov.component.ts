import { Component, OnInit } from '@angular/core';
import { Categoria, Productos, Proveedores } from 'src/app/models/model';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos-prov',
  templateUrl: './productos-prov.component.html',
  styleUrls: ['./productos-prov.component.css']
})
export class ProductosProvComponent implements OnInit {
  provedores: Proveedores[] = [];
  provedorForm!: FormGroup;
  imagenProveedorBase64: string = '';
  nombreImagen: string = '';
  extensionImagen: string = '';
  modalAbierto: boolean = false;
  imagenBase64: string = '';
  proveedorImageId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.provedorForm = this.fb.group({
      NombreProveedor: ['', Validators.required],
      ContactoProveedor: ['', Validators.required],
      DireccionProveedor: ['', Validators.required]
    });
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    // this.homeService.getCategorias().subscribe({
    //   next: async (categorias) => {
    //     this.categorias = await Promise.all(categorias.map(async (cat) => {
    //       let imagenBase64 = null;
    //       if (cat.ImagenID) {
    //         try {
    //           const imagen = await this.homeService.obtenerImagenPorId(cat.ImagenID).toPromise();
    //           imagenBase64 = imagen.DataBase64 || null;
    //         } catch (error) {
    //           console.error('Error obteniendo imagen para categoría', cat.id, error);
    //         }
    //       }
    //       return {
    //         ...cat,
    //         imagenBase64,
    //       };
    //     }));
    //   },
    //   error: (error) => {
    //     console.error('Error al obtener categorías', error);
    //   }
    // });
  }
  

  explorarCategoria(id: number) {
    
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.imagenBase64 = '';
  }

  onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenProveedorBase64 = reader.result as string;
          this.nombreImagen = file.name.split('.')[0] || 'perfil_' + Date.now();
          this.extensionImagen = file.name.split('.').pop() || 'png';
        };
        reader.readAsDataURL(file);
      }
    }
  
    async eliminarFoto() {
      this.imagenProveedorBase64 = '';
      this.nombreImagen = '';
      this.extensionImagen = '';
      // if (this.userImageId) {
      //   await this.perfilService.actualizarUsuario(Number(localStorage.getItem('userId')), { ImagenID: null }).toPromise();
      //   await this.perfilService.eliminarImagen(this.userImageId).toPromise();
      //   Swal.fire({
      //     icon: 'info',
      //     title: 'Imagen Eliminada',
      //     text: 'La imagen de perfil ha sido eliminada.',
      //     confirmButtonColor: '#3498db'
      //   });
      // }else {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: 'No tienes una imagen que eliminar.',
      //     confirmButtonColor: '#e74c3c'
      //   });
      // }
    }

  async guardarProvedores() {
    if (!this.imagenProveedorBase64) {
      Swal.fire({
        icon: 'error',
        title: 'Imagen requerida',
        text: 'Por favor, selecciona una imagen para la categoría.',
        confirmButtonColor: '#e74c3c'
      });
      return;
    }
    if (this.provedorForm.valid) {
      if (this.imagenProveedorBase64 && this.nombreImagen && this.extensionImagen) {
        const imagenData = {
          NombreImagen: this.nombreImagen,
          Extension: this.extensionImagen,
          DataBase64: this.imagenProveedorBase64,
          Referencia: 'proveedor'
        };
        // const response = await this.homeService.enviarDatosImagen(imagenData).toPromise();
        // this.categoriaImageId = response.ImagenID;
      }
      const nuevaCategoriaData = {
        NombreCategoria: this.provedorForm.value.NombreCategoria || null,
        Descripcion: this.provedorForm.value.Descripcion || null,
        ImagenID: this.proveedorImageId || null
      };
      // this.homeService.agregarCategorias(nuevaCategoriaData).subscribe(
      //   () => {
      //     Swal.fire({
      //       icon: 'success',
      //       title: 'Categoría guardada',
      //       text: 'Se agregó la categoría exitosamente.',
      //       confirmButtonColor: '#28a745'
      //     });
      //     this.obtenerCategorias();
      //     this.cerrarModal();
      //   },
      //   (error) => {
      //     console.error('Error al guardar categoría', error);
      //     Swal.fire({
      //       icon: 'error',
      //       title: 'Error',
      //       text: 'No se pudo guardar la categoría.',
      //       confirmButtonColor: '#e74c3c'
      //     });
      //   }
      // );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        confirmButtonColor: '#e74c3c'
      });
    }
  }
}
