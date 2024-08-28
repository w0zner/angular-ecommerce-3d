import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  fraseDelDia: String = ""
  frases: string[] = [
    'La vida es corta, sonríe mientras aún tengas dientes.',
    'El que madruga, encuentra todo cerrado.',
    'Es imposible aprender lo que crees que ya sabes.',
    'La risa es la distancia más corta entre dos personas.',
    'La vida es lo que pasa mientras planeas otras cosas.',
    'Hazlo con pasión, o no lo hagas en absoluto.',
    'El dinero no compra la felicidad, pero prefiero llorar en un Ferrari.',
    'Si puedes soñarlo, puedes hacerlo.',
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'La mejor manera de predecir el futuro es inventarlo.'
  ];

  constructor() {
    let indexDay = this.obtenerNumeroUnicoDeFechaActual()
    this.fraseDelDia = this.frases[indexDay]
  }

  ngOnInit(): void {

  }

  obtenerNumeroUnicoDeFechaActual(): number {
    const currentTime = Date.now();
    console.log(currentTime);

    const sumaDeDigitos = currentTime
      .toString()
      .split('')
      .map(Number)
      .reduce((acc, digit) => acc + digit, 0);

    const digito = sumaDeDigitos % 9 || 9;

    return digito;
  }

}
