import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaRoutingModule } from './bienvenida-routing.module';
import { BienvenidaComponent } from './bienvenida.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BienvenidaComponent],
  imports: [CommonModule, BienvenidaRoutingModule, MatButtonModule],
})
export class BienvenidaModule {}
