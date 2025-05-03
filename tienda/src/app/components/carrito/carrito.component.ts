import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoConDetalles, CarritoTemporal, Categoria, Compras, DetalleCompras, DetalleVentas, Productos, Ventas } from 'src/app/models/model';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: CarritoConDetalles[] = [];
  productos: Productos[] = [];
  categorias: Categoria[] = [];
  ventas: Ventas[] = [];
  detallesVentas: DetalleVentas[] = [];
  compras: Compras[] = [];
  detallesCompras: DetalleCompras[] = [];
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
      tarjeta: ['', [Validators.required]],
      titular: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      fecha: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]]
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
    if (this.carrito.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin productos',
        text: 'No hay productos en el carrito.',
        confirmButtonColor: '#3498db'
      });
      return;
    }
    this.mostrarModalPago = true;
  }
  
  cerrarModal() {
    this.mostrarModalPago = false;
    this.formPago.reset();
  }

  formatearNumTarjeta() {
    const control = this.formPago.get('tarjeta');
    if (!control) return;
  
    let valor = control.value.replace(/\D/g, '');
  
    valor = valor.substring(0, 16);
  
    const formateado = valor.replace(/(.{4})/g, '$1 ').trim();
  
    control.setValue(formateado, { emitEvent: false });
  }
  formatearFecha() {
    const control = this.formPago.get('fecha');
    if (!control) return;
  
    let valor = control.value.replace(/\D/g, '');
    if (valor.length > 4) valor = valor.slice(0, 4);
  
    if (valor.length >= 3) {
      valor = valor.slice(0, 2) + '/' + valor.slice(2);
    }
  
    control.setValue(valor, { emitEvent: false });
  
    if (valor.length < 5) {
      control.setErrors(null);
      return;
    }
  
    const mes = parseInt(valor.slice(0, 2), 10);
    const anio = parseInt('20' + valor.slice(3, 5), 10);
  
    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;
    const anioActual = hoy.getFullYear();
  
    let errores: any = {};
    if (mes < 1 || mes > 12) {
      errores.mesInvalido = true;
    } else if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
      errores.fechaPasada = true;
    }
  
    control.setErrors(Object.keys(errores).length ? errores : null);
  }
  
  formatearCVV() {
    const control = this.formPago.get('cvv');
    if (!control) return;
    let valor = control.value.replace(/\D/g, '').slice(0, 3);
    control.setValue(valor, { emitEvent: false });
  }
  
  
  
  async finalizarCompra() {
    if (this.formPago.invalid){
      Swal.fire({
        icon: 'info',
        title: 'Datos incompletos',
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonColor: '#3498db'
      });
      return;
    }else{
      const total = this.calcularTotal();
      const nuevaVenta = {
        FechaVenta: new Date(),
        UsuarioID: this.userId,
        TotalVenta: total
      };
      await this.cartService.agregarVentas(nuevaVenta).subscribe((venta: Ventas) => {
        this.ventas.push(venta);
        this.carrito.forEach(item => {
          const detalleVenta = {
            VentaID: venta.VentaID,
            ProductoID: item.ProductoID,
            CantidadVendida: item.Cantidad,
            PrecioUnitario: item.PrecioUnitario,
            Subtotal: item.Subtotal,
            FechaDetalle: new Date()
          };
          this.cartService.agregarDetallesVentas(detalleVenta).subscribe((detalle: DetalleVentas) => {
            this.detallesVentas.push(detalle);
          });
          this.cartService.eliminarTodoCarritoUsuario(this.userId).subscribe(() => {
            // this.carrito = [];
          });
        });
        this.cerrarModal();
        Swal.fire({
          icon: 'success',
          title: 'Compra exitosa',
          text: '¡Gracias por tu compra!',
          confirmButtonColor: '#28a745'
        }).then(async () => {
          // Generar el texto del QR
          let qrText = `Compra realizada\n\nProductos:\n`;
          this.carrito.forEach(item => {
            qrText += `- ${item.NombreProducto} x${item.Cantidad} = $${item.Subtotal.toFixed(2)}\n`;
          });
          qrText += `\nTOTAL: $${total.toFixed(2)}`;
          qrText += `\n\nGracias por tu compra!`;
          const qrBase64 = await QRCode.toDataURL(qrText);
          Swal.fire({
            title: 'Resumen de Compra',
            text: 'Escanea el código QR para ver tu recibo',
            imageUrl: qrBase64,
            imageAlt: 'QR de la compra',
            confirmButtonColor: '#3498db'
          });
          this.carrito = [];
        });      
      });
    }
  }
}