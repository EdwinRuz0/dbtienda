import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosALLComponent } from './components/productos-all/productos-all.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProductosProvComponent } from './components/productos-prov/productos-prov.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductosComponent },
  { path: 'productsAll', component: ProductosALLComponent },
  { path: 'proveedores', component: ProveedorComponent },
  { path: 'productsProv', component: ProductosProvComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'perfil', component: PerfilComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
