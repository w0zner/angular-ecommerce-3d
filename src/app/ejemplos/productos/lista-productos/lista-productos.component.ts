import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from '../../interfaces/producto.inteface';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[] = []

  constructor(private productoService: ProductosService){

  }
  ngOnInit(): void {
    this.cargarProductos()
  }

  cargarProductos() {
    this.productoService.cargarListaProductos().subscribe({
      next: response => {
        this.productos = response
      }
    })
  }

}
