import { Injectable, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  Firestore,
  collectionData,
  where,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async setData(data: any, base: string) {
    addDoc(collection(this.firestore, base), data).then((e) => {
      console.log('ok');
    });
  }

  getData(base: string) {
    const usuarios = collection(this.firestore, base);
    return collectionData(usuarios, { idField: 'id' });
  }

  getUser() {
    return this.auth.currentUser?.email;
  }

  getDataEspecialistas(base: string) {
    const usuarios = collection(this.firestore, base);
    const q = query(usuarios, where('verificado', '==', false));
    return collectionData(q, { idField: 'id' });
  }

  async actualizarDato(base: string, data: any) {
    data.forEach((element: any) => {
      const instanciaDoc = doc(this.firestore, base, element.id);
      updateDoc(instanciaDoc, element);
    });
  }

  async verificarEstado(base: string, email: any) {
    return new Promise((resolve, reject) => {
      const usuarios = collection(this.firestore, base);
      const user = collectionData(usuarios, { idField: 'id' }).subscribe(
        (e) => {
          let isVerified = false;
          e.forEach((element: any) => {
            if (element.email == email) {
              if (element.verificado == true) {
                isVerified = true;
              }
            }
          });
          resolve(isVerified); // Resuelve la promesa una vez que se completa la verificación
        },
        (error) => {
          reject(error); // Rechaza la promesa si ocurre un error
        }
      );
    });
  }
}
