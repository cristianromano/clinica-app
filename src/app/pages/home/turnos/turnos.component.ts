import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor() {
    this.userForm = new FormGroup({
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
    debugger;
    if (this.especialista !== $event) {
      this.especialista = $event;
    } else {
      this.especialista = null;
    }
  }

  handleDateChange(event: any) {
    debugger;
    this.userForm.get('fecha')?.setValue(event);
  }

  onSubmit() {}
}
