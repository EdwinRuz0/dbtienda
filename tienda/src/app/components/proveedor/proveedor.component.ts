import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedores } from 'src/app/models/model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent {
  proveedores: Proveedores[] = [];
  proveedorId: string = localStorage.getItem('proveedorId')!;
  constructor(private productosService: ProductosService, private router: Router ) {}

  ngOnInit(): void {

  }
  explorarProveedor(proveedorId: number) {

  }
  irAInicio(): void {
    this.router.navigate(['home']);
  }
}
