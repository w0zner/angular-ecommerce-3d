import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datos-entrada',
  templateUrl: './datos-entrada.component.html',
  styleUrls: ['./datos-entrada.component.css']
})
export class DatosEntradaComponent implements OnInit {

  archivo: File | undefined
  form: FormGroup

  constructor(private fb: FormBuilder, private activateRouted: ActivatedRoute){
    this.form = fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: [0, [Validators.required, Validators.min(5)]]
    })
  }

  ngOnInit(): void {
      this.cargar()
  }

  cargar() {
    this.activateRouted.params.subscribe({
      next: (resp:any) => {
        console.log("Cargo un parametro")
        console.log(resp.id)
      }
    })
  }


  observar(event: any){
    console.log(event.target.value)
  }

  subirArchivo(event: any){
    console.log(event.target.files[0]);
    this.archivo = event.target.files[0]
  }

  guardar(){
    console.log(this.form);

    if(this.form.valid) {
      console.log("Archivo: ",this.archivo?.name);
      console.log("Tipo: ",this.archivo?.type);
      console.log("Tamaño: ",this.archivo?.size);
    }
  }

}
