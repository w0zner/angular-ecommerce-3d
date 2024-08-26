import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/producto.inteface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.css']
})
export class DetalleProductosComponent implements OnInit {

prodID: number
producto: Producto | undefined


constructor(private activateRouted: ActivatedRoute, private productoService: ProductosService) {
  this.prodID = 0
}

ngOnInit(): void {
    this.cargar()
}

cargar() {
  this.activateRouted.params.subscribe({
    next: (resp:any) => {
      console.log("Cargo un parametro")
      console.log(resp.id)
      this.prodID = resp.id

      this.productoService.cargarProductoPorID(resp.id).subscribe({
        next: response => {
          this.producto = response
        }
      })

    }
  })
}
}
