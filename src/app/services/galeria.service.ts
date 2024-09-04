import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, doc, deleteDoc } from '@angular/fire/firestore';
import { Galeria } from '../ejemplos/interfaces/galeria.interface';


@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  private galeriaCollection: any

  constructor(private firestore: Firestore) {
    this.galeriaCollection = collection(this.firestore, "galeria")
   }

  addPhoto(data: Galeria): Promise<string>{
    return new Promise(async (resolve, reject) => {
      try {
        let docRef = await addDoc(this.galeriaCollection, data)
        resolve(docRef.id)
      } catch (error: any) {
        console.log(error.message);
        reject(error)
      }
    })
  }

  getPhotos():Promise<Galeria[]> {
    return new Promise(async (resolve, reject)=> {
      try {
        let querySnapshot = await getDocs(this.galeriaCollection)
        var photos: Galeria[] = []
        querySnapshot.forEach((doc) => {
          photos.push({id: doc.id, ...doc.data() as Galeria})
        });
        resolve(photos)
      } catch (error:any) {
        console.log(error.message);
        reject(error)
      }
    })
  }

  deletePhoto(id:string):Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let noteDoc = doc(this.galeriaCollection, id)
        await deleteDoc(noteDoc)
        resolve()
      } catch (error:any) {
        console.log(error.message);
        reject(error)
      }
    })
  }
}
