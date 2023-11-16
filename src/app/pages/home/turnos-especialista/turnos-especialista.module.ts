import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosEspecialistaRoutingModule } from './turnos-especialista-routing.module';
import { TurnosEspecialistaComponent } from './turnos-especialista.component';


@NgModule({
  declarations: [
    TurnosEspecialistaComponent
  ],
  imports: [
    CommonModule,
    TurnosEspecialistaRoutingModule
  ]
})
export class TurnosEspecialistaModule { }
