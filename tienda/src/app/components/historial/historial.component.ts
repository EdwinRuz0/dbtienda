import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compras, DetalleCompras, DetalleVentas, HistorialItem, Productos, Ventas } from 'src/app/models/model';
import { HistoryService } from 'src/app/services/history.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historial: HistorialItem[] = [];
  productos: Productos[] = [];
  ventas: Ventas[] = [];
  detallesVentas: DetalleVentas[] = [];
  compras: Compras[] = [];
  detallesCompras: DetalleCompras[] = [];
  rolUsuario: string = '';
  userId: number = 0;
  esAdmin: boolean = false;
  modalAbierto: boolean = false;
  mostrarFiltros = false;
  filtrosDisponibles = ['Fecha'];
  opcionesDropdown = ['Hoy', 'Esta semana', 'Este mes', 'Este año'];
  opcionFechaSeleccionada: string = '';
  filtroSeleccionado: string = ''; 
  imagenBase64: string = '';
  historialAgrupado: { venta: Ventas, detalles: { detalle: DetalleVentas, producto: Productos }[] }[] = [];
  historialOriginal: { venta: Ventas, detalles: { detalle: DetalleVentas, producto: Productos }[] }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private historyService: HistoryService,
  ) {}

  ngOnInit(): void {
    this.rolUsuario = localStorage.getItem('userRole') || '';
    this.userId = Number(localStorage.getItem('userId')) || 0;
    this.esAdmin = this.rolUsuario === 'administrador';
    this.obtenerHistorial();
  }
  
  obtenerHistorial() {
    const grupos: { venta: Ventas, detalles: { detalle: DetalleVentas, producto: Productos }[] }[] = [];
  
    const procesarVentas = (ventas: Ventas[]) => {
      ventas.forEach(venta => {
        this.historyService.getDetallesVentasByVentaId(venta.VentaID).subscribe((detalles: DetalleVentas[]) => {
          const detallesConProducto: { detalle: DetalleVentas, producto: Productos }[] = [];
  
          detalles.forEach(detalle => {
            this.historyService.getProductosId(detalle.ProductoID).subscribe(async (producto: Productos) => {
              if (producto.ImagenID) {
                const imagenData = await this.historyService.obtenerImagenPorId(producto.ImagenID).toPromise();
                producto.imagenBase64 = imagenData?.DataBase64 || '';
              }
  
              detallesConProducto.push({ detalle, producto });
  
              if (detallesConProducto.length === detalles.length) {
                grupos.push({ venta, detalles: detallesConProducto });
                this.historialAgrupado = grupos;
                this.historialOriginal = [...grupos];
              }
            });
          });
        });
      });
    };
  
    if (this.esAdmin) {
      this.historyService.getVentas().subscribe((ventas: Ventas[]) => {
        procesarVentas(ventas);
      });
    } else {
      this.historyService.getVentasByUserId(this.userId).subscribe((ventas: Ventas[]) => {
        procesarVentas(ventas);
      });
    }
  }
  
  seleccionarFiltro(filtro: string) {
    this.filtroSeleccionado = filtro;
    this.mostrarFiltros = false;
    this.ordenarFechas();
  }
  ordenarFechas() {
    if (!this.filtroSeleccionado || this.historialAgrupado.length === 0) return;
    const clave = this.filtroSeleccionado.toLowerCase();
    if (clave === 'fecha') {
      this.historialAgrupado.sort((a, b) => {
        const fechaA = new Date(a.venta.FechaVenta).getTime();
        const fechaB = new Date(b.venta.FechaVenta).getTime();
        return fechaB - fechaA;
      });
    }
  }
  cerrarBusqueda() {
    this.filtroSeleccionado = '';
    this.opcionFechaSeleccionada = '';
    this.mostrarFiltros = false;
    this.historialAgrupado = [...this.historialOriginal];
  }
  
  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }
  filtrarPorFechaSeleccionada() {
    if (!this.opcionFechaSeleccionada) return;
    const ahora = new Date();
    let fechaInicio: Date;
    switch (this.opcionFechaSeleccionada) {
      case 'Hoy':
        fechaInicio = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
        break;
  
      case 'Esta semana': {
        const diaSemana = ahora.getDay();
        const diferencia = diaSemana === 0 ? 6 : diaSemana - 1;
        fechaInicio = new Date(ahora);
        fechaInicio.setDate(ahora.getDate() - diferencia);
        fechaInicio.setHours(0, 0, 0, 0);
        break;
      }
  
      case 'Este mes':
        fechaInicio = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        break;
  
      case 'Este año':
        fechaInicio = new Date(ahora.getFullYear(), 0, 1);
        break;
  
      default:
        return;
    }
    const gruposFiltrados = this.historialAgrupado.filter(grupo => {
      const fechaVenta = new Date(grupo.venta.FechaVenta);
      return fechaVenta >= fechaInicio;
    });
    this.historialAgrupado = gruposFiltrados;
  }
  
}