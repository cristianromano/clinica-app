import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface User {
  email: string;
  dni: string;
  imagen: string;
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['email', 'dni', 'imagen'];
  clickedRows = new Set<User>();
  users: any = [];

  ngOnInit(): void {
    this.dataSource = this.firestore.getData('users');
  }

  constructor(private firestore: FirebaseService) {}

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
}
