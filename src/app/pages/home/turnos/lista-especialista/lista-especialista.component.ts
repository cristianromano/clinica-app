import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { disableDebugTools } from '@angular/platform-browser';
import { FirebaseService } from 'src/app/services/firebase.service';

interface Especialista {
  id: string;
  email: string;
  especialidad: string;
  imagen: string;
  // Agrega otras propiedades según tus datos
}

@Component({
  selector: 'app-lista-especialista',
  templateUrl: './lista-especialista.component.html',
  styleUrls: ['./lista-especialista.component.scss'],
})
export class ListaEspecialistaComponent {
  dataSource!: MatTableDataSource<Especialista>;
  displayedColumns: string[] = ['email', 'especialidad', 'imagen'];
  clickedRows = new Set<Especialista>();
  users: any = [];

  ngOnInit(): void {
    this.firestore
      .getDataEspecialistasVerificados('users')
      .subscribe((data: Especialista[]) => {
        this.dataSource = new MatTableDataSource(data);
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
