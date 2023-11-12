import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss'],
})
export class BienvenidaComponent {
  constructor(private route: Router) {}

  irLogin() {
    this.route.navigate(['/login']);
  }

  irRegistro() {
    this.route.navigate(['/registro']);
  }
}
