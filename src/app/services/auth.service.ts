import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public auth: Auth = inject(Auth);
  private usuarioLogueadoSubject = new BehaviorSubject<boolean>(false);
  usuarioLogueado$ = this.usuarioLogueadoSubject.asObservable();

  async loguearse(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password);
  }

  async registrarse(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password);
  }

  setUsuarioLogueado(logueado: boolean) {
    this.usuarioLogueadoSubject.next(logueado);
  }

  constructor() {}
}
