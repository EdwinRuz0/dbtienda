import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });
  }
  

  onSubmit(): void {
    if(this.registerForm.value.Password === this.registerForm.value.ConfirmPassword) {
      if (this.registerForm.valid) {
        const newUser = this.registerForm.value;
        this.registerService.enviarDatosBackend(newUser).subscribe((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: '¡Ahora puedes iniciar sesión!',
            confirmButtonColor: '#3498db'
          });
          this.router.navigate(['/']);
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
      }else {
        this.showErrorMessage('Por favor, complete todos los campos.');
      }
    }else {
      this.showErrorMessage('Las contraseñas no coinciden.');
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
