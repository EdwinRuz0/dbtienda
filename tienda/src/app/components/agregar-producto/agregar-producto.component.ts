import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Productos, Proveedores } from 'src/app/models/model';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedorService} from 'src/app/services/proveedor.service';
import { CategoriaService} from 'src/app/services/categoria.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {

  form!: FormGroup;
  base64Imagen: string = '';
  mensajeAlerta: string = '';
  nameImagen: string = '';
  alert: boolean = false;
  errorMessage: string = '';
  alertBueno: boolean = false;
  alertMalo: boolean = false;
  mensajeBueno: string = '';
  ListProvedor : Proveedores [] =[]

  constructor(private fb: FormBuilder, private auth: AuthServiceService, private producto: ProductosService, private categoria : CategoriaService, private provedor: ProveedorService) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      precio: ["", Validators.required],
      cantidad: ["", Validators.required],
      categoria: ["", Validators.required],
      provedor: ["", Validators.required],
    })
  }
  ngOnInit(): void {
    this.provedor.getProveedores().subscribe(
      (proveedor) => {
        console.log(proveedor);
        
        this.ListProvedor = proveedor;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }
  crear() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
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
  GuardarCultivo() {
    if (this.form.valid) {
      const data: Productos = {
        NombreProducto: this.form.controls['cultivo'].value,
        Descripcion: this.form.controls['cultivo'].value,
        Precio: this.form.controls['cultivo'].value,
        CantidadEnStock: this.form.controls['cultivo'].value,

      }
      console.log(data);
      this.producto.EnviarProducto(data).subscribe(response => {
        console.log('Respuesta del backend:', response);
        console.log('enviado xd')
        this.alertBueno = true;
        this.mensajeBueno = 'Bitacora Agregada con exito';
        setTimeout(() => {
          this.alertBueno = false;
          this.mensajeBueno = '';
        }, 2000);
        this.form.reset();
        this.base64Imagen = '';

      }, error => {
        console.error('Error al enviar datos al backend:', error);
        if (error.status === 409) {
          this.alertMalo = true;
          this.errorMessage = error.error.message;
          console.error('Error 409:', this.errorMessage);
          setTimeout(() => {
            this.alertMalo = false;
            this.errorMessage = '';
          }, 2000);
        } else {
          this.alertMalo = true;
          this.errorMessage = "Ocurrio un error en el servidor";
          setTimeout(() => {
            this.alertMalo = false;
            this.errorMessage = '';
          }, 2000);
        }
      });

    } else {
      this.alertMalo = true;
      this.errorMessage = "Llene todos los campos";
      setTimeout(() => {
        this.alertMalo = false;
        this.errorMessage = '';
      }, 2000);
    }
  }

}
