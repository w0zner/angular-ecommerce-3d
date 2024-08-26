import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatosEntradaComponent } from './ejemplos/datos-entrada/datos-entrada.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './ejemplos/inicio/inicio.component';
import { ListaProductosComponent } from './ejemplos/productos/lista-productos/lista-productos.component';
import { DetalleProductosComponent } from './ejemplos/productos/detalle-productos/detalle-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    DatosEntradaComponent,
    InicioComponent,
    ListaProductosComponent,
    DetalleProductosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
