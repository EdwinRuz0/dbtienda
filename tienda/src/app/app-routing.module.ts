import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosALLComponent } from './components/productos-all/productos-all.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProductosProvComponent } from './components/productos-prov/productos-prov.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductosComponent },
  { path: 'productsAll', component: ProductosALLComponent },
  { path: 'proveedores', component: ProveedorComponent },
  { path: 'productsProv', component: ProductosProvComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
