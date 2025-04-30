import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { Productos } from 'src/app/models/model';

@Component({
  selector: 'app-productos-all',
  templateUrl: './productos-all.component.html',
  styleUrls: ['./productos-all.component.css']
})
export class ProductosALLComponent {
  productos: Productos[] = [];
  constructor(private productosService: ProductosService, private router: Router ) {}

  ngOnInit(): void {
  }
}
