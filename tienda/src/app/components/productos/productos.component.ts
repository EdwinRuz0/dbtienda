import { Component } from '@angular/core';
import { Productos } from 'src/app/models/model';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos: Productos[] = [];
  id: string = localStorage.getItem('id')!;

  constructor(private productosService: ProductosService, private router: Router ) {}


  ngOnInit(): void {
    this.productosService.getProductos(this.id).subscribe(
      (productos) => {
        this.productos = productos;
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
}
