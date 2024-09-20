import { Component, OnInit } from '@angular/core';
import ThreeController from 'src/three/ThreeController';
import {CATEGORIES} from '../../../constants/constants'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  categories= CATEGORIES;
  three!: ThreeController
  fileModel!: File
  productForm: FormGroup
  guardando: boolean = false
  showMessage: boolean = false
  message: string = ""

  constructor(private fb: FormBuilder, private fileUploadService:FileUploadService, private productService:ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['all', Validators.required],
      price: ['', [Validators.required, this.greaterThanZero]],
      quantity: ['', [Validators.required, this.greaterThanZero]],
      description: ['', Validators.required],
      model3D: ['', Validators.required],
    })
  }

  greaterThanZero(control: AbstractControl) {
    return control.value > 0 ? null : { greaterThanZero: true }
  }

  ngOnInit(): void {
    console.log("cat ",this.categories);

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

        this.productForm.patchValue({model3D: this.fileModel.name})
        this.productForm.get("model3D")?.updateValueAndValidity();

        this.three.loadModel(URL.createObjectURL(this.fileModel))
      }
    }

    fileInput.click();
  }

  registerProduct() {
    this.guardando = true
    if(this.productForm.valid) {

      let productId = uuidv4()
      this.uploadFiles(productId).then((data) => {
        console.log(data);

        let product: Product = {
          id: productId,
          name: this.productForm.value.name,
          category: this.productForm.value.category,
          price: Number(this.productForm.value.price),
          quantity: Number(this.productForm.value.quantity),
          description: this.productForm.value.description,
          urlModel: data.urlModel,
          urlThumbnail: data.urlThumbnail,
          pathModel: data.pathModel,
          pathThumbnail: data.pathThumbnail
        }

        this.productService.addProduct(product).then(() => {
          this.productForm.reset();
          this.three.clear();
          this.guardando = false
          this.showMessage = true
          this.message = "Producto agregado con éxito!"

          setTimeout(() => {
            this.showMessage = false
          }, 3000);


        })
        .catch((error) => {
          this.guardando = false
          console.log(error)
        })
      })
      .catch((error)=> {
        this.guardando = false
      });
    } else {
      this.guardando = false
      console.log("error");
    }
  }

  uploadFiles(id:string) {

    return new Promise<any>(async (resolve, reject)=> {
      let fileThumbnail = await this.three.makeScreenshot()

      let pathThumbnail = `decora3D/${id}/${fileThumbnail.name}`
      let pathModel = `decora3D/${id}/${this.fileModel.name}`

      Promise.all([this.fileUploadService.uploadFile(fileThumbnail, pathThumbnail), this.fileUploadService.uploadFile(this.fileModel, pathModel)]).then((values)=> {
        let data = {
          urlThumbnail: values[0],
          urlModel: values[1],
          pathModel: pathModel,
          pathThumbnail: pathThumbnail
        }
        resolve(data)
      })


    })

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
