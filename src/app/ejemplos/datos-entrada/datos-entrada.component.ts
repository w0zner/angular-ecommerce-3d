import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-entrada',
  templateUrl: './datos-entrada.component.html',
  styleUrls: ['./datos-entrada.component.css']
})
export class DatosEntradaComponent {
  nombre: string;
  archivo: File | undefined

  constructor(){
    this.nombre=""
  }

  observar(event: any){
    console.log(event.target.value)
  }

  subirArchivo(event: any){
    console.log(event.target.files[0]);
    this.archivo = event.target.files[0]
  }

  guardar(){
    console.log("Nombre: ", this.nombre);
    console.log("Archivo: ",this.archivo?.name);
    console.log("Tipo: ",this.archivo?.type);
    console.log("Tamaño: ",this.archivo?.size);
  }

}
