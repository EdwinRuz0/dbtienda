import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service'; // Crea este servicio
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const { Password, ConfirmPassword } = this.registerForm.value;
      if (Password !== ConfirmPassword) {
        this.showErrorMessage('Las contraseñas no coinciden');
        return;
      }

      const datos = {
        UserName: this.registerForm.controls['UserName'].value,
        Password: this.registerForm.controls['Password'].value,
      };

      this.registerService.enviarDatosBackend(datos).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Ahora puedes iniciar sesión',
            confirmButtonColor: '#28a745'
          }).then(() => {
            this.router.navigate(['/']);
          });
        },
        (error) => {
          if (error.status === 409) {
            this.showErrorMessage(error.error.message);
          } else {
            this.showErrorMessage('Ocurrió un error en el servidor.');
          }
        }
      );
    } else {
      this.showErrorMessage('Por favor, completa todos los campos.');
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
}
