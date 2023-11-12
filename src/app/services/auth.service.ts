import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
  User,
  updateProfile,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public auth: Auth = inject(Auth);
  private usuarioLogueadoSubject = new BehaviorSubject<boolean>(false);
  private getUser = new BehaviorSubject<User | null>(null);
  usuarioLogueado$ = this.usuarioLogueadoSubject.asObservable();
  usuario$ = this.getUser.asObservable();

  async loguearse(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async registrarse(email: string, password: string): Promise<any> {
    new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, email, password).then((e) => {
        sendEmailVerification(e.user);
        resolve(e.user);
      });
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

  enviarMail(user: any) {
    sendEmailVerification(user);
  }

  setUser(user: User | null) {
    this.getUser.next(user);
  }

  actualizarUsuario(foto: any) {
    if (this.auth?.currentUser) {
      updateProfile(this.auth?.currentUser, {
        photoURL: foto,
      });
    }
  }

  constructor() {}
}
