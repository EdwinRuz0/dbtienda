import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forma = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.forma.valid) {
      const datos: Login = {
        UserName: this.forma.controls['UserName'].value,
        Password: this.forma.controls['Password'].value,
      };
      this.loginService.enviarDatosBackend(datos).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          this.router.navigate(['home']);
        },
        (error) => {
          if (error.status === 409) {
            this.showErrorMessage(error.error.message);
            console.error('Error 409:', error.error.message);
          } else {
            this.showErrorMessage("Ocurrió un error en el servidor");
          }
        }
      );
    } else {
      this.showErrorMessage('Por favor, complete todos los campos.');
    }
  }
  
  private showErrorMessage(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#e74c3c'
    });
  }

  onRegister(): void {
    console.log('Redirigiendo a la página de registro...');
    this.forma.clearValidators();
    this.router.navigate(['']);
  }
}
