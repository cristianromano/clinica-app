import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

type TipoOriginal = {
  id: any;
  paciente: any;
  id_especialista: any;
  especialista: any;
  especialidad: any;
  estado: string | undefined;
  comentario: any;
  estrellas?: number; // Hacemos 'estrellas' opcional
};

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.scss'],
})
export class TurnosEspecialistaComponent implements OnInit {
  userForm!: FormGroup;
  ngOnInit(): void {}
  turno: any = [];
  estado?: string;
  flag: number = 0;
  stars = [1, 2, 3, 4, 5];
  selectedStar: number = 0;

  constructor(
    private firestore: FirebaseService,
    private auth: AuthService,
    private toast: ToastrService
  ) {
    this.userForm = new FormGroup({
      turno: new FormControl(null, [Validators.required]),
    });
  }

  rate(star: number) {
    this.selectedStar = star;
  }

  obtenerTurno($event: any) {
    if (this.turno !== $event) {
      this.turno = $event;
      this.estado = this.turno.estado;
      this.userForm.get('turno')?.setValue($event);
    } else {
      this.turno = null;
      this.userForm.get('turno')?.setValue(null);
    }
  }

  onSubmit() {
    let data: TipoOriginal[] = [
      {
        id: this.turno.id,
        paciente: this.turno.paciente,
        id_especialista: this.turno.id_especialista,
        especialista: this.turno.especialista,
        especialidad: this.turno.especialidad,
        estado: this.estado,
        comentario: this.userForm.get('comentario')?.value
          ? this.userForm.get('comentario')?.value
          : '',
      },
    ];

    if (this.estado == 'finalizado') {
      data = [
        {
          ...data[0],
          estrellas: this.selectedStar,
        },
      ];
    }

    this.firestore.actualizarDato('turno', data).then((e) => {
      this.userForm.reset();
      this.toast.show(`se ${this.estado} turno`, 'Gestion de turnos');
    });

    this.userForm.removeControl('comentario');
    this.userForm.get('comentario')?.setValue('');
    this.estado = 'inactivo';
  }

  aceptarTurno() {
    this.estado = 'aceptado';
    this.flag = 1;
  }

  finalizarTurno() {
    this.estado = 'finalizado';
    this.userForm.addControl(
      'comentario',
      new FormControl(null, [Validators.required])
    );
  }

  cancelarTurno() {
    this.estado = 'cancelado';
    this.userForm.addControl(
      'comentario',
      new FormControl(null, [Validators.required])
    );
  }

  rechazarTurno() {
    this.estado = 'rechazado';
    this.userForm.addControl(
      'comentario',
      new FormControl(null, [Validators.required])
    );
  }
}
