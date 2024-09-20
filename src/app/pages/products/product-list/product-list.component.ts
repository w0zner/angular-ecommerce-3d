import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  categoryId: string = ""
  products: Product[] = []
  filteredProducts: Product[] = []

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService){}

  ngOnInit(): void {
    this.getProducts()
    this.activatedRoute.params.subscribe(params => {

      this.categoryId = params['categoryid'];
      this.filterByCategory()
      console.log(this.products)
    })
  }

  getProducts() {
    this.productService.getProducts().then((products) => {
      this.products = products
      this.filterByCategory();
    })
  }

  filterByCategory() {
    if(this.products) {
      if(this.categoryId != 'all'){
        this.filteredProducts = this.products.filter(product => product.category === this.categoryId)
      } else {
        this.filteredProducts = this.products
      }
      console.log(this.products);

    }
  }

}
