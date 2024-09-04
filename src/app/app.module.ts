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
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { NotasComponent } from './ejemplos/notas/notas.component';
import { GaleriaComponent } from './ejemplos/galeria/galeria.component';
import { VisorComponent } from './ejemplos/visor/visor.component';

@NgModule({
  declarations: [
    AppComponent,
    DatosEntradaComponent,
    InicioComponent,
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
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(()=> getStorage()),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
