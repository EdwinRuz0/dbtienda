import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private homeService: HomeService) {}

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
