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
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductosComponent,
    ProveedorComponent,
    RegisterComponent,
    PerfilComponent,
    NavbarComponent,
    CarritoComponent
  ],
  imports: [
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
