import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(public storage: Storage) { }

  uploadFile(file: File, path: string): Promise<string> {
      return new Promise((resolve, reject) => {
        let storageRef = ref(this.storage, path)
        uploadBytes(storageRef, file).then((snapshot)=> {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
          .catch(reject)
        })
        .catch(reject)
      })
  }

  deleteFile(path: string):Promise<void> {
    return new Promise((resolve, reject)=> {
      let storageRef = ref(this.storage, path)
      deleteObject(storageRef).then(()=>{
        resolve()
      }).catch(reject)
    })
  }
}
