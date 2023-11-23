import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
})
export class TurnosComponent implements OnInit {
  selected?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  userForm!: FormGroup;
  especialista: any = [];
  constructor(
    private firestore: FirebaseService,
    private auth: AuthService,
    private toast: ToastrService
  ) {
    this.userForm = new FormGroup({
      especialista: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
    });

    const hoy = new Date();
    this.minDate = hoy;
    const quinceDiasDespues = new Date(hoy);
    quinceDiasDespues.setDate(hoy.getDate() + 15);
    this.maxDate = quinceDiasDespues;
  }
  ngOnInit(): void {}

  obtenerEspecialista($event: any) {
    console.log($event);
    if (this.especialista !== $event) {
      this.especialista = $event;
      this.userForm.get('especialista')?.setValue($event);
    } else {
      this.especialista = null;
      this.userForm.get('especialista')?.setValue(null);
    }
  }

  handleDateChange(event: any) {
    this.userForm.get('fecha')?.setValue(event);
  }

  onSubmit() {
    const data = {
      paciente: this.auth.auth.currentUser?.email,
      id_especialista: this.especialista.id,
      especialista: this.especialista.email,
      especialidad: this.especialista.especialidad,
      estado: 'inactivo',
      fecha: this.userForm.get('fecha')?.value,
    };
    this.firestore.setData(data, 'turno').then((e) => {
      console.log(e);
      this.userForm.reset();
      this.toast.show('se registro turno', 'Gestion de turnos');
    });
  }
}
