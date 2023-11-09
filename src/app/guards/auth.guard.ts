import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

export const authGuard: CanActivateFn = (route, state) => {
  // constructor(private auth:AuthService,private firestore:FirebaseService) {

  // }

  // const user = this.auth?.auth?.currentUser?.email;
  // esAdmin = await this.firestore.verificarAdmin('admin', user);
  // if (esAdmin) {
  // }
  return true;
};
