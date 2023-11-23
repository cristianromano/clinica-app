import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';

interface User {
  id: string;
  email: string;
  imagen: string;
  // Agrega otras propiedades según tus datos
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent {
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'email', 'imagen'];
  clickedRows = new Set<User>();
  users: any = [];
  @Output() user = new EventEmitter<void>();

  ngOnInit(): void {
    this.firestore.getData('users').subscribe((data: DocumentData[]) => {
      const transformedData: User[] = data.map((doc: DocumentData) => {
        // Implementa la lógica para convertir un documento de Firestore en un objeto User
        const user: User = {
          // Asigna las propiedades correctas del documento a las propiedades del usuario
          id: doc['id'],
          email: doc['email'], // Asegúrate de que tu documento en Firestore tenga la propiedad email
          imagen: doc['imagen'], // Asegúrate de que tu documento en Firestore tenga la propiedad imagents
          // ...
        };
        return user;
      });

      this.dataSource = new MatTableDataSource(transformedData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.dataSource) {
      // Check if dataSource is defined before applying the filter
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      // Handle the case where dataSource is undefined (optional)
      console.error('DataSource is not initialized');
      // You might want to initialize the dataSource here or handle it appropriately
    }
  }

  constructor(private firestore: FirebaseService) {}

  gestionarTurno($event: any, row: any) {
    let entriesArray = Array.from($event);
    debugger;
    this.user.emit(row);
    const exists = this.users.some((user: any) => user.dni === row['dni']);
    if (exists) {
      this.users = this.users.filter((user: any) => user.dni !== row['dni']);
      this.clickedRows.delete(row);
    } else if (this.clickedRows.size > 1) {
      this.clickedRows.clear();
      this.clickedRows.add(row);
    } else if (!exists) {
      this.users.push(row);
      this.clickedRows.add(row);
    }
  }
}
