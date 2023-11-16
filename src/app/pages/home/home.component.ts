import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  usuario: any;
  userComun?: boolean = false;
  esAdmin?: boolean = false;
  admin: any;
  ngOnInit(): void {
    this.firebase.getUser().subscribe((e) => {
      if (e.length > 0) {
        this.usuario = e[0];
        this.auth.setUser(this.usuario);
        if (this.usuario.especialidad == 'null') {
          this.userComun = true;
        }
      } else {
        this.firebase
          .verificarAdmin('admin', this.auth.auth.currentUser?.email)
          .then((e) => {
            this.esAdmin = e;
            this.firebase.getAdmin().subscribe((e) => {
              this.admin = e;
              this.auth.setUser(this.admin);
              if (this.esAdmin == true) {
                this.userComun = true;
              }
            });
          });
      }
    });
  }

  constructor(
    private route: Router,
    private firebase: FirebaseService,
    private auth: AuthService
  ) {}

  irTurno() {
    this.route.navigate(['/turnos']);
  }

  irTurnoEspecialista() {
    this.route.navigate(['/turnos/especialista']);
  }
}
