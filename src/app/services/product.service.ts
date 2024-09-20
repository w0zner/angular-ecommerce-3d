import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productCollection: any

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, "decora3D");
  }

  addProduct(product: Product): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let docRef = doc(this.productCollection, product.id)
        await setDoc(docRef, product)
        resolve()
      } catch (error: any) {
        reject(error.message)
      }
    })
  }

  getProducts():Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let querySnapshot = await getDocs(this.productCollection)
        let products = querySnapshot.docs.map(doc => doc.data() as Product)
        resolve(products)
      } catch (error: any) {
        reject(error.message)
      }
    })
  }

  getProductById(productId: string): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      try {
        let docRef = doc(this.productCollection, productId)
        let docSnap = await getDoc(docRef)
        if(docSnap.exists()){
          let p = docSnap.data() as Product;
          resolve(p)
        }
      } catch (error: any) {
        reject(error.message)
      }
    })
  }


}
