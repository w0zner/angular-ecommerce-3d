import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Note } from '../ejemplos/interfaces/note.interface';


@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private notaCollection: any

  constructor(private firestore: Firestore) {
    this.notaCollection = collection(this.firestore, "notas")
  }

  addNote(nota: Note): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        let docRef = await addDoc(this.notaCollection, nota)
        resolve(docRef.id)
      } catch (error: any) {
        console.log(error.message);

      }
    })
  }

  getNotes():Promise<Note[]> {
    return new Promise(async (resolve, reject)=> {
      try {
        let querySnapshot = await getDocs(this.notaCollection)
        var notes: Note[] = []
        querySnapshot.forEach((doc) => {
          notes.push({id: doc.id, ...doc.data() as Note})
        });
        resolve(notes)
      } catch (error:any) {
        console.log(error.message);

      }
    })
  }

  deleteNote(id:string):Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let noteDoc = doc(this.notaCollection, id)
        await deleteDoc(noteDoc)
        resolve()
      } catch (error:any) {
        console.log(error.message);

      }
    })
  }

  updateNote(nota: Note):Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        let noteDoc = doc(this.notaCollection, nota.id)

        await updateDoc(noteDoc, {description: nota.description})
        resolve()
      } catch (error: any) {
        console.log(error.message);

      }
    })
  }


}
