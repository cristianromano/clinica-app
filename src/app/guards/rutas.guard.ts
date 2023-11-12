import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

export const rutasGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const router = new Router();
  const firestoreService = new FirebaseService();
  const usuario = authService.auth.currentUser?.email;

  if (usuario == null) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
