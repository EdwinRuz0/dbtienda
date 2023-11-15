import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { RolesService } from 'src/app/services/roles.service';
import { Login } from 'src/app/models/model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  forma!: FormGroup;
  mostrarPassword: boolean = false;
  errorMessage!: String;
  Alert: boolean = false;



  constructor(private fb: FormBuilder, private servicioLogin: LoginService, public roles: RolesService, private router: Router) {
    console.log('LoginComponent se ha inicializado');
    this.crearFormulario();
  }

  mostrarContra() {
    this.mostrarPassword = !this.mostrarPassword;

  }

  crearFormulario() {
    this.forma = this.fb.group({
      UserName: ["", Validators.required],
      Password: ["", Validators.required],
    })
  }
  crear() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
  }

  entrar() {
    this.Alert = false;
    const camposLlenos = () => {
      return (
        this.forma.controls['UserName'].value &&
        this.forma.controls['Password'].value
      );
    };
  
    // Continuar mostrando la alerta hasta que ambos campos estén llenos
    while (!camposLlenos()) {
      this.Alert = true;
      this.errorMessage = "Llene todos los campos";
      return; // Salir de la función si los campos están vacíos
    }
    console.log('alert')
    if (this.forma.valid) {
      const datos: Login = {
        Password: this.forma.controls['Password'].value,
        UserName: this.forma.controls['UserName'].value,
      }
      this.servicioLogin.enviarDatosBackend(datos).subscribe(
        resp => {
          console.log(resp);
          if (resp.role === 'usuario') {
            this.roles.setRole('usuario');
            console.log('rol', this.roles.getRole())
          } else if (resp.role === 'administrador') {
            this.roles.setRole('administrador');
            console.log('rol', this.roles.getRole())
          }else if(resp.role==='administradorPlantel'){
            this.roles.setRole('administradorPlantel');
            console.log('rol', this.roles.getRole())
          }

          const id: number = resp.id;
          let UserId: string = id.toString();
          this.roles.setId(UserId);
          
          console.log(this.roles.getId());
          this.router.navigate(['/home']);
        },
        error => {
          if (error.status === 409) {
            this.Alert = true;
            this.errorMessage = error.error.message;
            console.error('Error 409:', this.errorMessage);
          } else {
            this.Alert = true;
            this.errorMessage = "Ocurrio un error en el servidor";
          }
        }
      );
    } else {
      this.Alert = true;
      this.errorMessage = "Llene todos los campos";
    }
  }
  registro() {
    this.router.navigate(['/register']);
  }
  closeBootstrapAlert() {
    this.Alert = false;
  }
}

