import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './ejemplos/inicio/inicio.component';
import { DatosEntradaComponent } from './ejemplos/datos-entrada/datos-entrada.component';
import { ListaProductosComponent } from './ejemplos/productos/lista-productos/lista-productos.component';
import { DetalleProductosComponent } from './ejemplos/productos/detalle-productos/detalle-productos.component';
import { AuthComponent } from './ejemplos/auth/auth.component';
import { SigninComponent } from './ejemplos/auth/signin/signin.component';
import { SignupComponent } from './ejemplos/auth/signup/signup.component';
import { NotasComponent } from './ejemplos/notas/notas.component';
import { GaleriaComponent } from './ejemplos/galeria/galeria.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: InicioComponent },
  {path: 'formulario', component: DatosEntradaComponent},
  {path: 'formulario/:id', component: DatosEntradaComponent},
  {path: 'productos', component: ListaProductosComponent, children:[
    {path: 'detail/:id', component: DetalleProductosComponent}
  ]},
  {path: 'auth', component: AuthComponent, children: [
    {path: 'signin', component: SigninComponent},
    {path: 'signup', component: SignupComponent}
  ]},
  {path: 'notas', component: NotasComponent},
  {path: 'galeria', component: GaleriaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
