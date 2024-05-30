import { Component } from '@angular/core';
import { Productos } from 'src/app/models/model';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  form!: FormGroup;
  tarjetasFiltradas: Productos[] = [];
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

  constructor(private fb: FormBuilder, private productosService: ProductosService, private router: Router) {
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
    this.getProducto();
    this.suscription = this.productosService.refresh$.subscribe(() => {
      this.getProducto();
    })
  }
  getProducto() {
    this.productosService.getProductos().subscribe(
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
      tarjeta.NombreProducto.toLowerCase().includes(this.Busqueda.toLowerCase())
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
  Eliminar(id: any) {
    this.productosService.EliminarBitacora(id).subscribe(resp => {
      this.alertBueno = true;
      this.mensajeBueno = 'Registro Eliminado con exito';
      setTimeout(() => {
        this.alertBueno = false;
        this.mensajeBueno = '';
        location.reload();
      }, 1000);
    }, error => {
      console.error('Error al enviar datos al backend:', error);
      if (error.status === 409) {
        this.alert = true;
        this.errorMessage = error.error.message;
        console.error('Error 409:', this.errorMessage);
        setTimeout(() => {
          this.alert = false;
          this.errorMessage = '';
        }, 2000);
      } else {
        this.alert = true;

        this.errorMessage = "Ocurrio un error en el servidor";
        setTimeout(() => {
          this.alert = false;
          this.errorMessage = '';
        }, 2000);
      }
    })
  }


  Actualizar() {
    this.tarjetasFiltradas = []
    this.Producto = [];
    if (this.form.valid) {
      const data: any = {
        BitacoryFertilizer: this.form.controls['NombreFertilizante'].value,
        BitacoryFertilizerUsed: this.form.controls['CantidadFertilizante'].value,
        BitacoryNutrientQuantity: this.form.controls['CantidadNutrientes'].value,
        BitacoryNutrientsName: this.form.controls['NombresNutrientes'].value,
        BitacoryAmount: this.form.controls['CosechaObtenida'].value,
        BitacoryHarvestDate: this.form.controls['FechaCosecha'].value
      }
      console.log(data);

      this.productosService.ActualizarBitacora(this.ProductoID, data).subscribe(response => {
        console.log('Respuesta del backend:', response);
        console.log('enviado xd')
        this.alertBueno = true;
        this.mensajeBueno = 'Registro actualizado con exito';
        setTimeout(() => {
          this.alertBueno = false;
          this.mensajeBueno = '';
        }, 2000);
        console.log('enviado xd')

      }, error => {
        console.error('Error al enviar datos al backend:', error);
        console.error('Error al enviar datos al backend:', error);
        if (error.status === 409) {
          this.alert = true;
          this.errorMessage = error.error.message;
          console.error('Error 409:', this.errorMessage);
          setTimeout(() => {
            this.alert = false;
            this.errorMessage = '';
          }, 2000);
        } else {
          this.alert = true;

          this.errorMessage = "Ocurrio un error en el servidor";
          setTimeout(() => {
            this.alert = false;
            this.errorMessage = '';
          }, 2000);
        }
      });

    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convertir a megabytes

      console.log('Tamaño del archivo: ' + fileSizeInMB.toFixed(2) + ' MB');

      if (file.size <= 1048576) { // 1 MB en bytes (1024 * 1024)
        const nombreImagen = file.name;
        const extensionImagen = file.name.split('.').pop();
        const reader = new FileReader();
        const reference = 'E';

        reader.onload = (e: any) => {
          const base64Imagen = e.target.result;
          this.base64Imagen = base64Imagen;
          this.nameImagen = nombreImagen
          const data = {
            name: nombreImagen,
            extension: extensionImagen,
            data: base64Imagen,
            references: reference
          };
          console.log(data)

          // Puedes agregar aquí más lógica si es necesario

        };

        reader.readAsDataURL(file);
      } else {
        // Restablecer el mensaje antes de mostrar la alerta
        this.mensajeAlerta = '';

        const mensaje = 'La imagen es demasiado grande. Por favor, seleccione una imagen de menos de 1 MB.';
        this.mensajeAlerta = mensaje;
        console.error(mensaje);

        setTimeout(() => {
          this.mensajeAlerta = '';
        }, 3000);
      }
    }
  }
  onTextareaInput() {
    console.log('onTextareaInput called');

    const descripcionControl = this.form.get('descripcion');

    if (descripcionControl !== null) {
      const currentValue = descripcionControl.value;

      if (currentValue.length > 100) {
        const truncatedValue = currentValue.substring(0, 100);
        descripcionControl.setValue(truncatedValue);
        descripcionControl.setErrors({ 'maxCharacters': true });
      } else {
        descripcionControl.setErrors(null);
      }
    }
  }
}
