import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CATEGORIES } from 'src/app/constants/constants';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import ThreeController from 'src/three/ThreeController';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  categories = CATEGORIES
  productId: string =""
  product: Product | undefined

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService){}

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get("id")
    if(productId) this.getProductById(productId)
  }

  getProductById(id: string) {
    this.productService.getProductById(id).then((pro)=> {
      this.product = pro
      let content = document.getElementById("viewer") as HTMLDivElement
      let three = new ThreeController(content)
      three.loadModel(this.product.urlModel)
    })
  }

  getCategoryNameById(id: string) {
    return this.categories.find((cat) => cat.id === id)?.name || 'Categoría no encontrada'
  }

}
