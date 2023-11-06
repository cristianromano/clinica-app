import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  panelOpenState = false;
  usuarioLogueado: boolean = false;
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.auth.usuarioLogueado$.subscribe((logueado) => {
      this.usuarioLogueado = logueado;
    });
  }
  ngOnInit(): void {}

  logueado() {
    if (this.auth.auth.currentUser) {
      this.usuarioLogueado = true;
    } else {
      this.usuarioLogueado = false;
    }
  }
}
