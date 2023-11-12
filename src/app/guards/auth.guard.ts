import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = new AuthService();
  const firestoreService = new FirebaseService();
  const usuario = authService.auth.currentUser?.email;

  const esAdmin = await firestoreService.verificarAdmin('admin', usuario);
  if (esAdmin == true) {
    console.log('es admin');
    return true;
  } else {
    console.log('no es admin');
    return false;
  }
};
