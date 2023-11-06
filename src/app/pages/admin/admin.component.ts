import { Component, OnInit } from '@angular/core';
import { OnDisconnect } from '@angular/fire/database';
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
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['email', 'dni', 'imagen'];
  dataSource: any;
  clickedRows = new Set<User>();
  users: any = [];

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.dataSource = this.firebase.getData('users');
    console.log(this.dataSource);
  }

  aprobarUsuario($event: any, row: any) {
    let entriesArray = Array.from($event);

    debugger;

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
