import { Component, OnInit } from '@angular/core';
import { OnDisconnect } from '@angular/fire/database';
import { updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface User {
  email: string;
  dni: string;
  imagen: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  displayedColumns: string[] = ['email', 'dni', 'imagen', 'especialidad'];
  dataSource: any;
  clickedRows = new Set<User>();
  users: any = [];

  constructor(
    private firebase: FirebaseService,
    private toast: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.dataSource = this.firebase.getDataEspecialistas('users');
    console.log(this.dataSource);
  }

  aprobarUsuario($event: any, row: any) {
    let entriesArray = Array.from($event);

    const exists = this.users.some((user: any) => user.dni === row['dni']);

    if (exists) {
      this.users = this.users.filter((user: any) => user.dni !== row['dni']);
      this.clickedRows.delete(row);
    } else {
      this.users.push(row);
      this.clickedRows.add(row);
    }
  }

  aprobarEspecialista() {
    console.log(this.users);
    const usuarioVerificado: any[] = [];
    this.users.forEach((users: any) => {
      users.verificado = true;
      usuarioVerificado.push(users);
    });
    this.firebase
      .actualizarDato('users', usuarioVerificado)
      .then((e) => {
        this.toast.show('Se aprobo la solicitud');
      })
      .catch((e) => {
        this.toast.show(e.error);
      });
  }

  irAlta() {
    this.route.navigate(['admin/alta']);
  }
}
