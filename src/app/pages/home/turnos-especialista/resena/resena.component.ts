import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';

interface Resena {
  id_especialista: string;
  especialidad: string;
  paciente: string;
  diagnostico: string;
  estrellas: string;
  estado: string;
}

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.scss'],
})
export class ResenaComponent {
  dataSource!: MatTableDataSource<Resena>;
  displayedColumns: string[] = [
    'especialidad',
    'paciente',
    'diagnostico',
    'estrellas',
  ];
  clickedRows = new Set<Resena>();

  stars = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.firestore.getDataResena('turno').subscribe((data: Resena[]) => {
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

  generateStars(numStars: number): any[] {
    return Array(numStars).fill(0);
  }

  constructor(private firestore: FirebaseService) {}
}
