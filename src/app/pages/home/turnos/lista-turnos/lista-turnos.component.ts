import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';

interface Turnos {
  id_especialista: string;
  especialista: string;
  especialidad: string;
  paciente: string;
}

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.scss'],
})
export class ListaTurnosComponent {
  @Input() userTurno: any;

  dataSource!: MatTableDataSource<Turnos>;
  displayedColumns: string[] = ['especialidad', 'paciente', 'estado'];
  clickedRows = new Set<Turnos>();
  users: any = [];
  @Output() turnoUser = new EventEmitter<void>();

  ngOnInit(): void {
    this.firestore
      .getDataTurnosUsuario('turno', this.userTurno)
      .subscribe((data: Turnos[]) => {
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
    debugger;
    this.turnoUser.emit(row);
    const exists = this.users.some((user: any) => user.id === row['id']);
    if (exists) {
      this.users = this.users.filter((user: any) => user.id !== row['id']);
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
