import { Component } from '@angular/core';
import { Historial } from 'src/app/models/model';
import { HistorialService } from 'src/app/services/historial.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  form!: FormGroup;
  tarjetasFiltradas: Historial[] = [];
  Producto: any []=[];
  id: string = localStorage.getItem('id')!;
  alert: boolean = false;
  errorMessage: string = '';
  alertBueno: boolean = false;
  mensajeBueno: string = '';
  Busqueda: string = '';
  mostrarMensajeError: boolean = false;
  mensajeAlerta: string = '';
  base64Imagen: string = '';
  nameImagen: string = '';
  suscription!: Subscription;
  selectProducto: any;

  ProductoID!: number;
  NombreProducto!: string;
  Descripcion!: string;
  Precio!: number;
  CantidadEnStock!: number;
  CategoriaID!: number;
  ProveedorID!: number;

  constructor(private fb: FormBuilder, private historialService: HistorialService, private router: Router) {
    this.form = this.fb.group({
      CantidadFertilizante: [""],
      NombreFertilizante: [""],
      CantidadNutrientes: [""],
      NombresNutrientes: [""],
      CosechaObtenida: [""],
      FechaCosecha: [""]
    })
  }
  crear() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
  }
  ngOnInit(): void {
    this.getHistorial();
    this.suscription = this.historialService.refresh$.subscribe(() => {
      this.getHistorial();
    })
  }
  getHistorial() {
    this.historialService.getHistorial().subscribe(
      (productos) => {
        this.tarjetasFiltradas = productos;
        // console.log(productos);
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }
  irAInicio(): void {
    this.router.navigate(['home']);
  }
  checkMostrarAlerta() {
    if (this.buscarTarjetas().length === 0) {
      setTimeout(() => {
        this.mostrarAlerta();
      }, 3000);
    } else {
      this.mostrarMensajeError = false; // Ocultar la alerta si hay resultados
    }
  }

  mostrarAlerta() {
    if (this.Busqueda.trim() !== '') {
      this.mostrarMensajeError = true;
    }
  }
  buscarTarjetas() {
    if (this.Busqueda.trim() === '') {
      return this.tarjetasFiltradas; // Cambiar a tarjetasFiltradas
    }
    return this.tarjetasFiltradas.filter(tarjeta => // Cambiar a tarjetasFiltradas
      tarjeta.NombreTabla.toLowerCase().includes(this.Busqueda.toLowerCase())
    );
  }
  showProductDetails(Producto: any) {
    this.selectProducto = Producto;
    this.ProductoID = Producto.ProductoID;
    this.NombreProducto = Producto.NombreProducto;
    this.Descripcion = Producto.Descripcion;
    this.Precio = Producto.Precio;
    this.CantidadEnStock = Producto.CantidadEnStock;
    this.CategoriaID = Producto.CategoriaID;
    this.ProveedorID = Producto.ProveedorID;

  }
  limpiarDatosModal() {
    this.selectProducto = null; // o asigna un objeto vacío, dependiendo de tu implementación
  }
}

