import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth)

  constructor() { }

  signUp(email: string, password: string): Promise<UserCredential> {
    return new Promise(async (resolve, reject) => {
      try {
        let userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
        resolve(userCredential)
      } catch(error: any) {
        let message = error.message //.replace("FirebaseError: Firebase:", "")
        const startIndex = message.indexOf("Error (");
        const finalMessage = message.substring(startIndex).replace("Firebase: ", "");
        reject(finalMessage)
      }
    })
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return new Promise(async (resolve, reject)=> {
      try {
        let userCredential = await signInWithEmailAndPassword(this.auth, email, password)
        resolve(userCredential)
      } catch (error: any) {
        let message = error.message //.replace("FirebaseError: Firebase:", "")
        const startIndex = message.indexOf("Error (");
        const finalMessage = message.substring(startIndex).replace("Firebase: ", "");
        reject(finalMessage)
      }
    })
  }
}
