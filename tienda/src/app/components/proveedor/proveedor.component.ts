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
    this.productosService.getProveedores().subscribe(
      (proveedores) => {
        this.proveedores = proveedores;
        // console.log(productos);
      },
      (error) => {
        console.error('Error al obtener los proveedores', error);
      }
    );
  }
  explorarProveedor(proveedorId: number) {
    console.log(`Explorar proveedor con ID: ${proveedorId}`);
    localStorage.setItem('proveedorId',proveedorId.toString())
    this.productosService.getProductosProv(this.proveedorId).subscribe(
      (productos) => {
        console.log('Productos del proveedor:', productos);
        this.router.navigate(['productsProv']);
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }
  irAInicio(): void {
    this.router.navigate(['home']);
  }
}
