import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/model';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorias: Categoria[] = [];
  id: string = localStorage.getItem('id')!;

  constructor(private homeService: HomeService, private router: Router, private productosService: ProductosService) {}

  ngOnInit(): void {
    this.homeService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener categorías', error);
      }
    );
  }
}
