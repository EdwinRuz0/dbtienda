import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Productos } from 'src/app/models/model';
import { ProductosService } from 'src/app/services/productos.service';
import { AuthServiceService} from 'src/app/services/auth-service.service';

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

  constructor(private fb: FormBuilder, private cultivos: CultivosService, private bitacora: BitacoraService, private auth: AuthService, private suelo: SueloService, private riego: RiegoService) {
    this.form = this.fb.group({
      cultivo: ["", Validators.required],
      nombreCientifico: ["", Validators.required],
      etapasFenologicas: ["", Validators.required],
      CantidadSembrada: ["", Validators.required],
      TipoDeSuelo: ["", Validators.required],
      PhSuelo: ["", Validators.required],
      TipoDeRiego: ["", Validators.required],
      PhRiego: ["", Validators.required],
      FertilizanteAplicado: ["", Validators.required],
      NombreFertilizante: ["", Validators.required],
      NutirenteNecesario: ["", Validators.required],
      NombreNutriente: ["", Validators.required],
      CosechaEsperada: ["", Validators.required],
      CosechaObtenida: [""],
      FechaSiembra: ["", Validators.required],
      FechaCosecha: [""],
    })
  }
  ngOnInit(): void {
    this.cultivos.GetCultivos().subscribe((dato: any) => {
      console.log(dato);
      this.cultivo = dato;
    });
    this.suelo.GetCultivos().subscribe((dato: any) => {
      console.log(dato, 'suelos');
      this.suelos = dato;

    })
    this.riego.GetRiego().subscribe((dato: any) => {
      console.log(dato, 'riegoo');
      this.riegos = dato;

    })
  }
  crear() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
  }
  onSelectCultivo(event: any) {
    const selectedCultivoName = event.target.value;
    const selectedCultivo = this.cultivo.find(cultivo => cultivo.CropsSeed === selectedCultivoName);
    if (selectedCultivo) {
      this.form.patchValue({
        nombreCientifico: selectedCultivo.CropsScientificName,
        etapasFenologicas: selectedCultivo.CropsPhenological_stage
      });
    }
  }
  onSelectSuelo(event: any) {
    const selectSuelo = event.target.value;
    const selectedSuelo = this.suelos.find(suelos => suelos.SurfaceType === selectSuelo);
    if (selectedSuelo) {
      this.form.patchValue({
        PhSuelo: selectedSuelo.SurfacePh,
      });
    }
  }
  onSelectRiego(event: any) {
    const selectRiego = event.target.value;
    const selectedRiego = this.riegos.find(riego => riego.irrigationName === selectRiego);
    if (selectedRiego) {
      this.form.patchValue({
        PhRiego: selectedRiego.irrigationPh,
      });
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
      const data: Bitacora = {
        BitacoryCrop: this.form.controls['cultivo'].value,
        BitacoryScientificName: this.form.controls['nombreCientifico'].value,
        BitacorySurfaceType: this.form.controls['TipoDeSuelo'].value,
        BitacoryIrrigationType: this.form.controls['TipoDeRiego'].value,
        BitacoryPhSurface: this.form.controls['PhSuelo'].value,
        BitacoryPhIrrigation: this.form.controls['PhRiego'].value,
        BitacoryFertilizer: this.form.controls['NombreFertilizante'].value,
        BitacoryFertilizerUsed: this.form.controls['FertilizanteAplicado'].value,
        BitacoryExpectedQuantity: this.form.controls['CosechaEsperada'].value,
        BitacoryNutrientsName: this.form.controls['NombreNutriente'].value,
        BitacoryNutrientQuantity: this.form.controls['NutirenteNecesario'].value,
        BitacoryAmount: this.form.controls['CosechaObtenida'].value,
        BitacorySeedTime: this.form.controls['FechaSiembra'].value,
        BitacoryHarvestDate: this.form.controls['FechaCosecha'].value,
        BitacoryUsers_id: this.auth.getIdUser(this.auth.getToken()!),
        BitacoryPhonologicalStage: this.form.controls['etapasFenologicas'].value,
        BitacoryObtained: this.form.controls['CantidadSembrada'].value
      }
      console.log(data);
      this.bitacora.EnviarBitacora(data).subscribe(response => {
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
