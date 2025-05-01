import { Component, OnInit } from '@angular/core';
import { Categoria, Productos, Proveedores } from 'src/app/models/model';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  provedores: Proveedores[] = [];
  todosLosProveedores: Proveedores[] = []; // ← COPIA ORIGINAL PARA FILTRAR
  rolUsuario: string = '';
  provedorForm!: FormGroup;
  imagenProveedorBase64: string = '';
  nombreImagen: string = '';
  extensionImagen: string = '';
  modalAbierto: boolean = false;
  imagenBase64: string = '';
  proveedorImageId: number | null = null;
  mostrarFiltros = false;
  filtrosDisponibles = [
    'Nombre'
  ];
  filtroSeleccionado: string = ''; 
  textoBusqueda: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('userRole') || '';
    this.provedorForm = this.fb.group({
      NombreProveedor: ['', Validators.required],
      ContactoProveedor: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      DireccionProveedor: ['', Validators.required]
    });
    this.obtenerProveedores();
  }

  soloNumeros(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.provedorForm.get('ContactoProveedor')?.setValue(input.value);
  }
  

  obtenerProveedores() {
    this.proveedorService.getProveedores().subscribe({
      next: async (provedores) => {
        this.provedores = await Promise.all(provedores.map(async (prov) => {
          let imagenBase64 = null;
          if (prov.ImagenID) {
            try {
              const imagen = await this.proveedorService.obtenerImagenPorId(prov.ImagenID).toPromise();
              imagenBase64 = imagen.DataBase64 || null;
            } catch (error) {
              console.error('Error obteniendo imagen para proveedor', prov.ProveedorID, error);
            }
          }
          return {
            ...prov,
            imagenBase64,
          };
        }));
        this.todosLosProveedores = [...this.provedores]; 
      },
      error: (error) => {
        console.error('Error al obtener proveedores', error);
      }
    });
  }
  
  seleccionarFiltro(filtro: string) {
    this.filtroSeleccionado = filtro;
    this.mostrarFiltros = false;
    this.ordenarProveedores();
  }

  ordenarProveedores() {
    if (!this.filtroSeleccionado || this.provedores.length === 0) return;
  
    const clave = this.filtroSeleccionado.toLowerCase();
  
    this.provedores.sort((a: any, b: any) => {
      if (clave === 'nombre') {
        return a.NombreProveedor.localeCompare(b.NombreProveedor);
      }
      return 0;
    });
  }

  cerrarBusqueda() {
    this.filtroSeleccionado = '';
    this.textoBusqueda = '';
    this.mostrarFiltros = false;
    this.provedores = [...this.todosLosProveedores];
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
    this.provedores = this.todosLosProveedores.filter((provedor: any) => {
    if (clave === 'nombre') {
      return provedor.NombreProveedor?.toLowerCase().includes(texto);
    }
    return false;
    });
  }

  explorarProveedor(proveedorId: number) {
    this.router.navigate(['/productsAll'], { queryParams: { proveedorId } });
  }
  
  abrirModal() {
    if (this.rolUsuario !== 'administrador') return;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.imagenBase64 = '';
    this.provedorForm.reset();
    this.imagenProveedorBase64 = '';
    this.nombreImagen = '';
    this.extensionImagen = '';
    this.proveedorImageId = null;
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
        text: 'Por favor, selecciona una imagen para el proveedor.',
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
        const response = await this.proveedorService.enviarDatosImagen(imagenData).toPromise();
        this.proveedorImageId = response.ImagenID;
      }
      const nuevoProveedorData = {
        NombreProveedor: this.provedorForm.value.NombreProveedor || null,
        ContactoProveedor: this.provedorForm.value.ContactoProveedor || null,
        DireccionProveedor: this.provedorForm.value.DireccionProveedor || null,
        ImagenID: this.proveedorImageId || null
      };
      this.proveedorService.agregarProveedores(nuevoProveedorData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Proveedor guardada',
            text: 'Se agregó el proveedor exitosamente.',
            confirmButtonColor: '#28a745'
          });
          this.obtenerProveedores();
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al guardar el proveedor', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la proveedor.',
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
