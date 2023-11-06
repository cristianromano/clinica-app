import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:usuarioLogueado', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
