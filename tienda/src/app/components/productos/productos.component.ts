import { Component, OnInit } from '@angular/core';
import { Categoria, Productos, Proveedores } from 'src/app/models/model';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Productos[] = [];
  todosLosProductos: Productos[] = []; // ← COPIA ORIGINAL PARA FILTRAR
  rolUsuario: string = '';
  productosForm!: FormGroup;
  imagenProductosBase64: string = '';
  nombreImagen: string = '';
  extensionImagen: string = '';
  modalAbierto: boolean = false;
  imagenBase64: string = '';
  productoImageId: number | null = null;
  cantidadesSugeridas = [1, 5, 10, 20, 50, 100];
  categorias: Categoria[] = [];
  categoriaSeleccionada: string = '';
  proveedores: Proveedores[] = [];
  proveedorSeleccionado: string = '';
  mostrarFiltros = false;
  filtrosDisponibles = [
    'Nombre',
    'Categoría',
    'Proveedor',
    'Precio',
  ];
  filtroSeleccionado: string = ''; 
  textoBusqueda: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productosService: ProductosService, 
    private homeService: HomeService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('userRole') || '';
    this.productosForm = this.fb.group({
      NombreProducto: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Precio: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      CantidadEnStock: ['', Validators.required],
      CategoriaID: ['', Validators.required],
      ProveedorID: ['', Validators.required]
    });
    this.route.queryParams.subscribe((params) => {
      this.categoriaSeleccionada = params['categoriaId'] || '';
      this.proveedorSeleccionado = params['proveedorId'] || '';
    });
  
    this.homeService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      this.proveedorService.getProveedores().subscribe((proveedores) => {
        this.proveedores = proveedores;
        this.obtenerProductos();
      });
    });
  }

  obtenerProductos() {
    this.productosService.getProductos().subscribe({
      next: async (productos) => {
        const mapeados  = await Promise.all(productos.map(async (prod) => {
          let imagenBase64 = null;
          if (prod.ImagenID) {
            try {
              const imagen = await this.productosService.obtenerImagenPorId(prod.ImagenID).toPromise();
              imagenBase64 = imagen.DataBase64 || null;
            } catch (error) {
              console.error('Error obteniendo imagen para productos', prod.ProductoID, error);
            }
          }
          const categoria = this.categorias.find(cat => cat.id === prod.CategoriaID);
          const proveedor = this.proveedores.find(prov => prov.ProveedorID === prod.ProveedorID);
          return {
            ...prod,
            imagenBase64,
            CategoriaNombre: categoria?.NombreCategoria || '—',
            NombreProveedor: proveedor?.NombreProveedor || '—',
          };
        }));
        let filtrados = mapeados;
      if (this.categoriaSeleccionada) {
        filtrados = filtrados.filter(p => p.CategoriaID == Number(this.categoriaSeleccionada));
        this.filtroSeleccionado = 'Categoría';
        this.textoBusqueda = this.categorias.find(c => c.id == Number(this.categoriaSeleccionada))?.NombreCategoria || '';
      } else if (this.proveedorSeleccionado) {
        filtrados = filtrados.filter(p => p.ProveedorID == Number(this.proveedorSeleccionado));
        this.filtroSeleccionado = 'Proveedor';
        this.textoBusqueda = this.proveedores.find(p => p.ProveedorID == Number(this.proveedorSeleccionado))?.NombreProveedor || '';
      }

      this.productos = filtrados;
      this.todosLosProductos = [...mapeados]; // ← COPIA ORIGINAL PARA FILTRAR
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      }
    });
  }

  seleccionarFiltro(filtro: string) {
    this.filtroSeleccionado = filtro;
    this.mostrarFiltros = false;
    this.ordenarProductos();
  }

  ordenarProductos() {
    if (!this.filtroSeleccionado || this.productos.length === 0) return;
  
    const clave = this.filtroSeleccionado.toLowerCase();
  
    this.productos.sort((a: any, b: any) => {
      if (clave === 'nombre') {
        return a.NombreProducto.localeCompare(b.NombreProducto);
      } else if (clave === 'categoría') {
        return (a.CategoriaNombre || '').localeCompare(b.CategoriaNombre || '');
      } else if (clave === 'proveedor') {
        return (a.NombreProveedor || '').localeCompare(b.NombreProveedor || '');
      } else if (clave === 'precio') {
        return a.Precio - b.Precio;
      }
      return 0;
    });
  }
  
  cerrarBusqueda() {
    this.filtroSeleccionado = '';
    this.textoBusqueda = '';
    this.mostrarFiltros = false;
    this.router.navigate([], { queryParams: {} });
    this.productos = [...this.todosLosProductos];
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
    this.productos = this.todosLosProductos.filter((producto: any) => {
    if (clave === 'nombre') {
      return producto.NombreProducto?.toLowerCase().includes(texto);
    } else if (clave === 'categoría') {
      return producto.CategoriaNombre?.toLowerCase().includes(texto);
    } else if (clave === 'proveedor') {
      return producto.NombreProveedor?.toLowerCase().includes(texto);
    } else if (clave === 'precio') {
      return producto.Precio?.toString().includes(texto);
    }
    return false;
    });
  }
  
  explorarCategoria(id: number) {
    
  }

  abrirModal() {
    if (this.rolUsuario !== 'administrador') return;
    this.modalAbierto = true;
  }
  

  cerrarModal() {
    this.modalAbierto = false;
    this.imagenBase64 = '';
    this.productosForm.reset();
    this.imagenProductosBase64 = '';
    this.nombreImagen = '';
    this.extensionImagen = '';
    this.productoImageId = null;
  }

  onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenProductosBase64 = reader.result as string;
          this.nombreImagen = file.name.split('.')[0] || 'perfil_' + Date.now();
          this.extensionImagen = file.name.split('.').pop() || 'png';
        };
        reader.readAsDataURL(file);
      }
    }
  
    async eliminarFoto() {
      this.imagenProductosBase64 = '';
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

  async guardarProductos() {
    if (!this.imagenProductosBase64) {
      Swal.fire({
        icon: 'error',
        title: 'Imagen requerida',
        text: 'Por favor, selecciona una imagen para el producto.',
        confirmButtonColor: '#e74c3c'
      });
      return;
    }
    if (this.productosForm.valid) {
      if (this.imagenProductosBase64 && this.nombreImagen && this.extensionImagen) {
        const imagenData = {
          NombreImagen: this.nombreImagen,
          Extension: this.extensionImagen,
          DataBase64: this.imagenProductosBase64,
          Referencia: 'producto'
        };
        const response = await this.productosService.enviarDatosImagen(imagenData).toPromise();
        this.productoImageId = response.ImagenID;
      }
      const nuevoProductoData = {
        NombreProducto: this.productosForm.value.NombreProducto || null,
        Descripcion: this.productosForm.value.Descripcion || null,
        Precio: this.productosForm.value.Precio || null,
        CantidadEnStock: this.productosForm.value.CantidadEnStock || null,
        CategoriaID: this.productosForm.value.CategoriaID || null,
        ProveedorID: this.productosForm.value.ProveedorID || null,
        ImagenID: this.productoImageId || null
      };
      this.productosService.agregarProductos(nuevoProductoData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto guardado',
            text: 'Se agregó el producto exitosamente.',
            confirmButtonColor: '#28a745'
          });
          this.obtenerProductos();
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al guardar producto', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar el producto.',
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
