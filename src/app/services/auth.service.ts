import { Injectable, inject } from '@angular/core';
import { Auth, Persistence, User, UserCredential, browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth'
import { Subject } from 'rxjs/internal/Subject';
import firebase from 'firebase/compat/app';
import { persistentLocalCache } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private auth: Auth = inject(Auth)

  private fullName = new BehaviorSubject<string | null>(null);
  fullName$ = this.fullName.asObservable();

  name: string = ""

  constructor(private auth: Auth) {
    this.checkUserSession();
  }

  public checkUserSession(): Boolean {
    let isLogged = false
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      console.log("user logueado");

      const user = JSON.parse(savedUser);
      const currentTime = new Date().getTime();
      const tokenExpirationTime = new Date(user.expirationTime).getTime();

      // Verificar si el token ha expirado
      if (currentTime > tokenExpirationTime) {
        // El token ha expirado, intentar renovarlo
        this.renewToken().then((newTokenData) => {
          // Actualizar el token en localStorage
          user.token = newTokenData.token;
          user.expirationTime = newTokenData.expirationTime;
          localStorage.setItem('user', JSON.stringify(user));
          this.fullName.next(user.displayName);  // Actualizar la información del usuario
          isLogged = true;
          //this.name = user.displayName
        }).catch((error) => {
          console.error('Error al renovar el token:', error);
          this.signOut();  // Cerrar sesión si no se puede renovar el token
        });
      } else {
        // El token sigue siendo válido, actualizar la información del usuario
        this.fullName.next(user.displayName);
        isLogged = true;
        //this.name = user.displayName
      }
    }
    return isLogged;
  }

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

  signIn(email: string, password: string): Promise<UserCredential> {
    return new Promise(async (resolve, reject)=> {
      try {
        let userCredential = await signInWithEmailAndPassword(this.auth, email, password)
        this.fullName.next(userCredential.user.displayName!)

        if (userCredential.user) {
          const token = await userCredential.user.getIdTokenResult(); // Obtener el token y sus detalles

          // Almacenar información del usuario y el token en localStorage
          localStorage.setItem('user', JSON.stringify({
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            token: token.token,  // El token de acceso
            expirationTime: token.expirationTime  // La hora de expiración del token
          }));
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
        this.name = ""
        resolve(true);
      } catch (error) {
        console.error("Error al desloguearse:", error);
        reject(false);
      }
    })
  }

  renewToken(): Promise<{ token: string, expirationTime: string }> {
    return new Promise(async (resolve, reject) => {
      const currentUser = this.auth.currentUser;
      if (currentUser) {
        try {
          const idTokenResult = await currentUser.getIdToken(true);  // Forzar la renovación del token
          const tokenDetails = await currentUser.getIdTokenResult();  // Obtener los nuevos detalles del token

          resolve({
            token: tokenDetails.token,
            expirationTime: tokenDetails.expirationTime
          });
        } catch (error) {
          reject(error);
        }
      } else {
        reject('No hay un usuario autenticado');
      }
    });
  }

  getUser() {
    return this.auth.currentUser
  }

  // Método para obtener el usuario guardado en localStorage
  getStoredUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

   // Verificar la validez del token del usuario logueado
   checkTokenValidity(): Promise<boolean> {
    const user: User | null = this.auth.currentUser;


    if (user) {
      return user.getIdTokenResult().then((idTokenResult: any) => {
        const currentTime = Math.floor(Date.now() / 3600); // Obtener la hora actual en segundos
        const tokenExpirationTime = idTokenResult.expirationTime;

        console.log("aaa",idTokenResult);

        console.log('Token expira en:', tokenExpirationTime);

        // Verificar si el token ha expirado
        if (idTokenResult.claims.exp > currentTime) {
          console.log('Token es válido');
          return true;
        } else {
          console.log('Token ha expirado');
          return false;
        }
      }).catch(error => {
        console.error('Error al verificar el token:', error);
        return false;
      });
    } else {
      console.log('No hay un usuario logueado');
      return Promise.resolve(false);
    }
  }

  checkUserValidity(): Promise<boolean> {
    const user: User | null = this.getStoredUser();

    if (user) {
      return user.getIdTokenResult().then((idTokenResult: any) => {
        const currentTime = Math.floor(Date.now() / 3600); // Obtener la hora actual en segundos
        const tokenExpirationTime = idTokenResult.expirationTime;

        console.log("aaa",idTokenResult);

        console.log('Token expira en:', tokenExpirationTime);

        // Verificar si el token ha expirado
        if (idTokenResult.claims.exp > currentTime) {
          console.log('Token es válido');
          return true;
        } else {
          console.log('Token ha expirado');
          return false;
        }
      }).catch(error => {
        console.error('Error al verificar el token:', error);
        return false;
      });
    } else {
      console.log('No hay un usuario logueado');
      return Promise.resolve(false);
    }
  }
}
