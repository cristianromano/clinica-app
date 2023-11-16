import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ListaEspecialistaComponent } from './lista-especialista/lista-especialista.component';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [TurnosComponent, ListaEspecialistaComponent],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class TurnosModule {}
