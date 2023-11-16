import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TurnosModule } from './turnos/turnos.module';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TurnosModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
})
export class HomeModule {}
