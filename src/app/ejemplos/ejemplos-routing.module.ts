import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { DatosEntradaComponent } from './datos-entrada/datos-entrada.component';
import { ListaProductosComponent } from './productos/lista-productos/lista-productos.component';
import { DetalleProductosComponent } from './productos/detalle-productos/detalle-productos.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotasComponent } from './notas/notas.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { VisorComponent } from './visor/visor.component';

const routes: Routes = [
  {path: '', redirectTo: '/ejemplos/home', pathMatch: 'full'},
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
  {path: 'galeria', component: GaleriaComponent},
  {path: 'visor', component: VisorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjemplosRoutingModule { }
