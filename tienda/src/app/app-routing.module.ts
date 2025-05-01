import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productsAll', component: ProductosComponent },
  { path: 'proveedores', component: ProveedorComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'carrito', component: CarritoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
