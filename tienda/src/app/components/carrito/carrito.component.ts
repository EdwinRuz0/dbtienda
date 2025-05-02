import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoConDetalles, CarritoTemporal, Categoria, Productos } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: CarritoConDetalles[] = [];
  productos: Productos[] = [];
  categorias: Categoria[] = [];
  rolUsuario: string = '';
  userId: number = 0;
  formPago!: FormGroup;
  imagenProductosBase64: string = '';
  nombreImagen: string = '';
  extensionImagen: string = '';
  modalAbierto: boolean = false;
  imagenBase64: string = '';
  productoImageId: number | null = null;
  mostrarFiltros = false;
  mostrarModalPago = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService, 
    private productosService: ProductosService,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('userRole') || '';
    this.userId = Number(localStorage.getItem('userId')) || 0;
    this.formPago = this.fb.group({
      tarjeta: ['', [Validators.required, Validators.minLength(16)]],
      titular: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.obtenerCarrito();
  }
  
  obtenerCarrito() {
    this.cartService.getCarritoUsuarioId(this.userId).subscribe(async res => {
      const carritoArray = Array.isArray(res) ? res : res ? [res] : [];
      const productosConDetalles = await Promise.all(carritoArray.map(async item => {
        let imagenBase64 = null;
        try {
          const producto = await this.cartService.getProductosId(item.ProductoID).toPromise();
          if (producto?.ImagenID) {
            const imagen = await this.cartService.obtenerImagenPorId(producto.ImagenID).toPromise();
            imagenBase64 = imagen.DataBase64 || null;
          }
          return {
            ...item,
            NombreProducto: producto?.NombreProducto || 'Producto desconocido',
            PrecioUnitario: producto?.Precio || 0,
            ImagenBase64: imagenBase64,
            Subtotal: (producto?.Precio || 0) * item.Cantidad
          };
        } catch (error) {
          console.error('Error cargando producto o imagen del carrito', error);
          return { ...item, NombreProducto: 'Error', PrecioUnitario: 0, ImagenBase64: '', Subtotal: 0 };
        }
      }));
  
      this.carrito = productosConDetalles;
    });
  }
  

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.Subtotal, 0);
  }
  
  cambiarCantidad(item: any, delta: number) {
    const nuevaCantidad = item.Cantidad + delta;
    if (nuevaCantidad < 1) return;
  
    item.Cantidad = nuevaCantidad;
    item.Subtotal = item.PrecioUnitario * nuevaCantidad;
  
    const actualizado = {
      CarritoID: item.CarritoID,
      UsuarioID: this.userId,
      ProductoID: item.ProductoID,
      Cantidad: item.Cantidad,
      FechaAgregado: item.FechaAgregado
    };
  
    this.cartService.actualizarCarrito(item.CarritoID, actualizado).subscribe();
  }
  
  eliminarDelCarrito(item: any) {
    this.cartService.eliminarCarrito(item.CarritoID).subscribe(() => {
      this.carrito = this.carrito.filter(p => p.CarritoID !== item.CarritoID);
    });
  }
  
  abrirModalPago() {
    this.mostrarModalPago = true;
  }
  
  cerrarModal() {
    this.mostrarModalPago = false;
  }
  
  finalizarCompra() {
    if (this.formPago.invalid || this.carrito.length === 0) return;
  
    const total = this.calcularTotal();
  
    const nuevaVenta = {
      ClienteID: this.userId,
      FechaVenta: new Date(),
      TotalVenta: total
    };
  
    // this.cartService.realizarCompra(nuevaVenta, this.carrito).subscribe(() => {
    //   Swal.fire('Éxito', '¡Compra realizada con éxito!', 'success');
    //   this.carrito = [];
    //   this.mostrarModalPago = false;
    // });
  }

}