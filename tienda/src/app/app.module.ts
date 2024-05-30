import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosALLComponent } from './components/productos-all/productos-all.component';
import { ProductosProvComponent } from './components/productos-prov/productos-prov.component';
import { ProveedoresComponent } from './components/proveedor/proveedor.component';
import { FooterComponent} from './components/footer/footer.component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AgregarProductoComponent} from './components/agregar-producto/agregar-producto.component';
import { CategoriaComponent} from './components/categoria/categoria.component';
import { HistorialComponent} from './components/historial/historial.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductosComponent,
    ProductosALLComponent,
    ProductosProvComponent,
    ProveedoresComponent,
    FooterComponent,
    NavbarComponent,
    AgregarProductoComponent,
    CategoriaComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      // {path: 'home', component:HomeComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
