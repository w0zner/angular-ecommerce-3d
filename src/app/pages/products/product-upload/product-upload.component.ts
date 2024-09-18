import { Component, OnInit } from '@angular/core';
import ThreeController from 'src/three/ThreeController';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  three!: ThreeController
  fileModel!: File

  ngOnInit(): void {
    let content = document.getElementById("viewer") as HTMLDivElement;
    this.three = new ThreeController(content)
  }

  loadFile() {
    let fileInput = document.createElement("input")
    fileInput.type = "file"

    fileInput.onchange = (e: Event) => {
      let input = e.target as HTMLInputElement
      if(input.files && input.files.length > 0) {
        this.fileModel = input.files[0]

        this.three.loadModel(URL.createObjectURL(this.fileModel))
      }
    }

    fileInput.click();
  }

  capturaPantalla() {
    this.three.makeScreenshot().then((file) => {
      let link = document.createElement("a")
      link.href = URL.createObjectURL(file)
      link.download = file.name
      link.click()

    }).catch((error)=> {
      console.log(error);

    })
  }

}
