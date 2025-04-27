import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductosALLComponent } from './components/productos-all/productos-all.component';
import { ProveedoresComponent } from './components/proveedor/proveedor.component';
import { ProductosProvComponent } from './components/productos-prov/productos-prov.component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { FooterComponent} from './components/footer/footer.component';
import { CategoriaComponent} from './components/categoria/categoria.component';
import { HistorialComponent} from './components/historial/historial.component';
import { AgregarProductoComponent} from './components/agregar-producto/agregar-producto.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'products', component: ProductosComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'agregar-producto', component: AgregarProductoComponent },
  { path: '**', redirectTo: '' }, // opcional: cualquier ruta inválida te regresa al login
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
