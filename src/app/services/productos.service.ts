import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Producto } from '../ejemplos/interfaces/producto.inteface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = 'assets/data/productos.json'

  constructor(private http: HttpClient) {

  }

  cargarListaProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url)
  }

  cargarProductoPorID(id: number): Observable<Producto | undefined> {
    return this.cargarListaProductos().pipe(
      map((productos: Producto[]) => productos.find(producto => producto.id === id))
    )
  }

}
