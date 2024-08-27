import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatosEntradaComponent } from './ejemplos/datos-entrada/datos-entrada.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { InicioComponent } from './ejemplos/inicio/inicio.component';
import { ListaProductosComponent } from './ejemplos/productos/lista-productos/lista-productos.component';
import { DetalleProductosComponent } from './ejemplos/productos/detalle-productos/detalle-productos.component';
import { firebaseConfig } from 'src/enviroments/enviroments';
import { AuthComponent } from './ejemplos/auth/auth.component';
import { SigninComponent } from './ejemplos/auth/signin/signin.component';
import { SignupComponent } from './ejemplos/auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DatosEntradaComponent,
    InicioComponent,
    ListaProductosComponent,
    DetalleProductosComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
