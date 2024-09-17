import { Injectable, inject } from '@angular/core';
import { Auth, Persistence, UserCredential, browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth'
import { Subject } from 'rxjs/internal/Subject';
import firebase from 'firebase/compat/app';
import { persistentLocalCache } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth)

  private fullName = new Subject<string>()
  fullName$ = this.fullName.asObservable();

  constructor() { }

  signUp(fullname: string, email: string, password: string): Promise<UserCredential> {
    return new Promise(async (resolve, reject) => {
      try {
        let userCredential = await createUserWithEmailAndPassword(this.auth, email, password)

        if(userCredential.user) {
          await updateProfile(userCredential.user, {displayName: fullname})
        }

        resolve(userCredential)
      } catch(error: any) {
        let message = error.message //.replace("FirebaseError: Firebase:", "")
        const startIndex = message.indexOf("Error (");
        const finalMessage = message.substring(startIndex).replace("Firebase: ", "");
        reject(finalMessage)
      }
    })
  }

  loginWithPersistence(email: string, password: string) {
    return setPersistence(this.auth, browserLocalPersistence)  // Establecemos persistencia en localStorage
      .then(() => {
        return signInWithEmailAndPassword(this.auth, email, password);
      })
      .catch((error) => {
        console.error('Error durante la autenticación:', error);
        throw error;
      });
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return new Promise(async (resolve, reject)=> {
      try {
        let userCredential = await signInWithEmailAndPassword(this.auth, email, password)
        this.fullName.next(userCredential.user.displayName!)

        if (userCredential.user) {
          localStorage.setItem('user', JSON.stringify(userCredential.user));  // Guardar el objeto user en localStorage
        }

        resolve(userCredential)
      } catch (error: any) {
        let message = error.message //.replace("FirebaseError: Firebase:", "")
        const startIndex = message.indexOf("Error (");
        const finalMessage = message.substring(startIndex).replace("Firebase: ", "");
        reject(finalMessage)
      }
    })
  }

  signOut(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.auth.signOut();
        localStorage.removeItem('user');
        resolve(true);
      } catch (error) {
        console.error("Error al desloguearse:", error);
        reject(false);
      }
    })
  }

  getUser() {
    return this.auth.currentUser
  }

  // Método para obtener el usuario guardado en localStorage
  getStoredUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
