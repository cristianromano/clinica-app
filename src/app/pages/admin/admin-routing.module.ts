import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AltaAdminComponent } from './alta/alta-admin/alta-admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'admin/alta', component: AltaAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
