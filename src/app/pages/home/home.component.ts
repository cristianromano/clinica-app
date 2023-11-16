import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  usuario: any;
  userComun?: boolean = false;
  ngOnInit(): void {
    this.firebase.getUser().subscribe((e) => {
      this.usuario = e[0];
      if (this.usuario.especialidad == 'null') {
        this.userComun = true;
      }
    });
  }

  constructor(private route: Router, private firebase: FirebaseService) {}

  irTurno() {
    this.route.navigate(['/turnos']);
  }
}
