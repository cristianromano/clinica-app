import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosEspecialistaRoutingModule } from './turnos-especialista-routing.module';
import { TurnosEspecialistaComponent } from './turnos-especialista.component';
import { ListaTurnosComponent } from './lista-turnos/lista-turnos.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ResenaComponent } from './resena/resena.component';

@NgModule({
  declarations: [TurnosEspecialistaComponent, ListaTurnosComponent, ResenaComponent],
  imports: [
    CommonModule,
    TurnosEspecialistaRoutingModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class TurnosEspecialistaModule {}
