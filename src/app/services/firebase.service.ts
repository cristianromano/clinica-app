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
    const usuarios = collection(this.firestore, 'users');
    return collectionData(usuarios);
  }

  getUser() {
    return this.auth.currentUser?.email;
  }
}
