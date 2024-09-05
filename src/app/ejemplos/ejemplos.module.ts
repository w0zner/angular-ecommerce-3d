import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjemplosRoutingModule } from './ejemplos-routing.module';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    InicioComponent,
    DatosEntradaComponent,
    ListaProductosComponent,
    DetalleProductosComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    NotasComponent,
    GaleriaComponent,
    VisorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EjemplosRoutingModule
  ]
})
export class EjemplosModule { }
