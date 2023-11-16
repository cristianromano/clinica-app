import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'turnos',
    loadChildren: () =>
      import('./turnos/turnos.module').then((m) => m.TurnosModule),
  },
  {
    path: 'turnos/especialista',
    loadChildren: () =>
      import('./turnos-especialista/turnos-especialista.module').then(
        (m) => m.TurnosEspecialistaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
