import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  panelOpenState = false;
  usuarioLogueado: boolean = false;
  user: any;
  admin: any;
  constructor(
    private auth: AuthService,
    private route: Router,
    private firebase: FirebaseService
  ) {
    this.auth.usuarioLogueado$.subscribe((logueado) => {
      this.usuarioLogueado = logueado;
    });
    this.auth.usuario$.subscribe(async (e) => {
      this.admin = e;
      if (this.admin[0].admin == true) {
        this.firebase.getAdmin().subscribe((e) => {
          this.user = e;
        });
      } else {
        this.firebase.getUser().subscribe((e) => {
          this.user = e;
        });
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
    if (this.user) {
      return '/home';
    } else {
      return '/';
    }
  }
}
