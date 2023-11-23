import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/models/model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-prov',
  templateUrl: './productos-prov.component.html',
  styleUrls: ['./productos-prov.component.css']
})
export class ProductosProvComponent {
  productos: Productos[] = [];
  proveedorId: string = localStorage.getItem('proveedorId')!;

  constructor(private productosService: ProductosService, private router: Router ) {}


  ngOnInit(): void {
    this.productosService.getProductosProv(this.proveedorId).subscribe(
      (productos) => {
        this.productos = productos;
        console.log(productos);
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
