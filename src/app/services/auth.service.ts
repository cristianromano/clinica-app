import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
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
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async registrarse(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password).then((e) => {
      sendEmailVerification(e.user);
    });
  }

  setUsuarioLogueado(logueado: boolean) {
    this.usuarioLogueadoSubject.next(logueado);
  }

  eliminarUsuario(data: any) {
    // data.forEach((res: { email: string }) => {
    //   auth()
    //     .getUserByEmail(res.email)
    //     .then((e) => {
    //       console.log(e);
    //     });
    // });
    //admin.auth().deleteUser(user);
  }

  constructor() {}
}
