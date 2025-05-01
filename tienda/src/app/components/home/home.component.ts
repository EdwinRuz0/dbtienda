import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/model';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoriaForm!: FormGroup;
  categorias: Categoria[] = [];
  todosLasCategorias: Categoria[] = []; // ← COPIA ORIGINAL PARA FILTRAR
  rolUsuario: string = '';
  imagenCategoriaBase64: string = '';
  nombreImagen: string = '';
  extensionImagen: string = '';
  modalAbierto: boolean = false;
  imagenBase64: string = '';
  categoriaImageId: number | null = null;
  mostrarFiltros = false;
  filtrosDisponibles = [
    'Nombre'
  ];
  filtroSeleccionado: string = ''; 
  textoBusqueda: string = '';

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('userRole') || '';
    this.categoriaForm = this.fb.group({
      NombreCategoria: ['', Validators.required],
      Descripcion: ['', Validators.required]
    });
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.homeService.getCategorias().subscribe({
      next: async (categorias) => {
        this.categorias = await Promise.all(categorias.map(async (cat) => {
          let imagenBase64 = null;
          if (cat.ImagenID) {
            try {
              const imagen = await this.homeService.obtenerImagenPorId(cat.ImagenID).toPromise();
              imagenBase64 = imagen.DataBase64 || null;
            } catch (error) {
              console.error('Error obteniendo imagen para categoría', cat.id, error);
            }
          }
          return {
            ...cat,
            imagenBase64,
          };
        }));
        this.todosLasCategorias = [...this.categorias]; 
      },
      error: (error) => {
        console.error('Error al obtener categorías', error);
      }
    });
  }
  
  
  seleccionarFiltro(filtro: string) {
    this.filtroSeleccionado = filtro;
    this.mostrarFiltros = false;
    this.ordenarCategorias();
  }

  ordenarCategorias() {
    if (!this.filtroSeleccionado || this.categorias.length === 0) return;
  
    const clave = this.filtroSeleccionado.toLowerCase();
  
    this.categorias.sort((a: any, b: any) => {
      if (clave === 'nombre') {
        return a.NombreCategoria.localeCompare(b.NombreCategoria);
      }
      return 0;
    });
  }

  cerrarBusqueda() {
    this.filtroSeleccionado = '';
    this.textoBusqueda = '';
    this.mostrarFiltros = false;
    this.categorias = [...this.todosLasCategorias];
  }
  
  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }
  
  buscar() {
    if (!this.filtroSeleccionado) {
      Swal.fire({
        icon: 'info',
        title: 'Selecciona un filtro',
        text: 'Por favor, selecciona un tipo de filtro antes de buscar.',
        confirmButtonColor: '#3498db'
      });
      return;
    }
    if (this.textoBusqueda.trim() === '') {return}
    console.log(`Buscando "${this.textoBusqueda}" por "${this.filtroSeleccionado}"`);
    const texto = this.textoBusqueda.toLowerCase();
    const clave = this.filtroSeleccionado.toLowerCase();
    this.categorias = this.todosLasCategorias.filter((categoria: any) => {
    if (clave === 'nombre') {
      return categoria.NombreCategoria?.toLowerCase().includes(texto);
    }
    return false;
    });
  }

  explorarCategoria(idCategoria: number) {
    this.router.navigate(['/productsAll'], { queryParams: { categoriaId: idCategoria } });
  }
  

  abrirModal() {
    if (this.rolUsuario !== 'administrador') return;
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
          this.imagenCategoriaBase64 = reader.result as string;
          this.nombreImagen = file.name.split('.')[0] || 'perfil_' + Date.now();
          this.extensionImagen = file.name.split('.').pop() || 'png';
        };
        reader.readAsDataURL(file);
      }
    }
  
    async eliminarFoto() {
      this.imagenCategoriaBase64 = '';
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

  async guardarCategoria() {
    if (!this.imagenCategoriaBase64) {
      Swal.fire({
        icon: 'error',
        title: 'Imagen requerida',
        text: 'Por favor, selecciona una imagen para la categoría.',
        confirmButtonColor: '#e74c3c'
      });
      return;
    }
    if (this.categoriaForm.valid) {
      if (this.imagenCategoriaBase64 && this.nombreImagen && this.extensionImagen) {
        const imagenData = {
          NombreImagen: this.nombreImagen,
          Extension: this.extensionImagen,
          DataBase64: this.imagenCategoriaBase64,
          Referencia: 'categoria'
        };
        const response = await this.homeService.enviarDatosImagen(imagenData).toPromise();
        this.categoriaImageId = response.ImagenID;
      }
      const nuevaCategoriaData = {
        NombreCategoria: this.categoriaForm.value.NombreCategoria || null,
        Descripcion: this.categoriaForm.value.Descripcion || null,
        ImagenID: this.categoriaImageId || null
      };
      this.homeService.agregarCategorias(nuevaCategoriaData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Categoría guardada',
            text: 'Se agregó la categoría exitosamente.',
            confirmButtonColor: '#28a745'
          });
          this.obtenerCategorias();
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al guardar categoría', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la categoría.',
            confirmButtonColor: '#e74c3c'
          });
        }
      );
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
