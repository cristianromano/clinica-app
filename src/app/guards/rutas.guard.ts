import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

export const rutasGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const router = new Router();
  const firestoreService = new FirebaseService();
  const usuario = authService.auth.currentUser?.email;
  console.log(usuario);
  if (usuario == null) {
    router.navigate(['/login']);
    console.log('puede');
    return false;
  } else {
    console.log('no puede');
    return true;
  }
};
