import { Component } from '@angular/core';
import { Model } from '../interfaces/model.interface';
import ThreeController from 'src/three/ThreeController';


@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent {

  models: Model[] =[
    {
      id: '1',
      url: 'assets/models/table.glb',
      name: 'mesa'
    },
    {
      id: '2',
      url: 'assets/models/sofa.glb',
      name: 'silla'
    },
    {
      id: '3',
      url: 'assets/models/sofa_chair.glb',
      name: 'table'
    }
  ]

  ngAfterViewInit(){
    for (let model of this.models) {
      let container = document.getElementById(model.id) as HTMLDivElement
      let three = new ThreeController(container)
      three.loadModel(model.url)
    }
  }
  
}
