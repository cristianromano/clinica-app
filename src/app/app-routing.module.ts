import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/bienvenida' },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then((m) => m.RegistroModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'bienvenida',
    loadChildren: () =>
      import('./pages/bienvenida/bienvenida.module').then(
        (m) => m.BienvenidaModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
