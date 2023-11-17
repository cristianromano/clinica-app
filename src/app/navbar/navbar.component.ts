import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { filter, first, take } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  panelOpenState = false;
  usuarioLogueado: boolean = false;
  usuarioArr: any[] = [];
  admin: any;
  esAdmin: boolean = false;

  constructor(
    private auth: AuthService,
    private route: Router,
    private firebase: FirebaseService
  ) {
    this.auth.usuarioLogueado$.subscribe((logueado) => {
      this.usuarioLogueado = logueado;
    });

    this.auth.usuario$.subscribe((e) => {
      if (this.auth.auth.currentUser) {
        this.usuarioArr = [];
        if (this.auth.auth.currentUser && e) {
          this.admin = e;
          this.esAdmin = this.admin.admin;
          if (this.admin.admin == true && this.usuarioArr.length < 1) {
            this.usuarioArr.push(e);
            this.usuarioLogueado = true;
          } else {
            if (this.usuarioArr.length < 1) {
              this.usuarioArr.push(e);
              this.usuarioLogueado = true;
            }
          }
        }
      }
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

  logOut() {
    this.auth.auth.signOut();
    this.usuarioLogueado = false;
    this.route.navigate(['/login']);
  }

  irAdmin() {
    this.route.navigate(['/admin']);
  }

  irSegunLog() {
    if (this.usuarioArr) {
      return '/home';
    } else {
      return '/';
    }
  }
}
