import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StorageService } from 'src/app/services/storage.service';

interface User {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  edad: string;
  dni: string;
  file: string;
  verificado: boolean;
}

interface Especialidad {
  id: string;
  especialidad: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  userForm!: FormGroup;
  file?: any;
  foto?: any;
  usuario: User[] = [];
  toggleChecked: boolean = false;
  especialidadNueva?: string;
  especialidadArr: Especialidad[] = [];
  captchaResponse?: string;
  fotoUser?: string;

  constructor(
    private toast: ToastrService,
    private firestore: FirebaseService,
    private route: Router,
    private auth: AuthService,
    private storage: StorageService
  ) {
    this.userForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
      apellido: new FormControl('', [
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      edad: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        Validators.min(18),
        Validators.max(99),
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        Validators.maxLength(8),
        Validators.minLength(8),
      ]),
      file: new FormControl('', [Validators.required]),
      obrasocial: new FormControl('', [Validators.required]),
      especialidad: new FormControl(
        'null',
        this.esRequerido ? Validators.required : null
      ),
      especialidadNueva: new FormControl(),
      captchaResponse: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.getEspecialidades();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const usuario = {
        nombre: this.userForm.get('nombre')?.value,
        apellido: this.userForm.get('apellido')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
        edad: this.userForm.get('edad')?.value,
        dni: this.userForm.get('dni')?.value,
        imagen: '',
        verificado: true,
        especialidad: this.userForm.get('especialidad')?.value,
      };
      this.auth
        .registrarse(
          this.userForm.get('email')?.value,
          this.userForm.get('password')?.value
        )
        .then((e) => {
          this.uploadFile().then((e) => {
            if (this.toggleChecked) {
              usuario.verificado = false;
            }
            this.auth.actualizarUsuario(this.foto);
            usuario.imagen = this.foto;
            this.firestore.setData(usuario, 'users');
            this.toast.show('Registrado', 'Registrado con exito');
            this.userForm.reset();
            this.file = null;
          });
        })
        .catch((e) => {
          console.log(e.error);
        });
    }
  }

  irLogin() {
    this.route.navigate(['/login']);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  async uploadFile() {
    if (this.file) {
      this.foto = await this.storage.subirArchivo(this.file, 'perfil');
    }
  }

  toggleChanged(checked: boolean) {
    this.toggleChecked = checked;
    if (this.toggleChecked) {
      this.userForm.patchValue({ obrasocial: 'no tiene' });
      this.userForm.patchValue({ especialidad: '' });
    } else {
      this.userForm.patchValue({ obrasocial: '' });
      this.userForm.patchValue({ especialidad: 'no tiene' });
    }
  }

  cambiarRegistro(valor: boolean) {
    this.toggleChecked = valor;
    if (this.toggleChecked) {
      this.userForm.patchValue({ obrasocial: 'no tiene' });
      this.userForm.patchValue({ especialidad: '' });
    } else {
      this.userForm.patchValue({ obrasocial: '' });
      this.userForm.patchValue({ especialidad: 'no tiene' });
    }
  }
  agregarEspecialidad() {
    let e = this.userForm.get('especialidadNueva')?.value;
    if (e) {
      const randomNumber = Math.floor(Math.random() * 900) + 100;
      const data = {
        id: randomNumber,
        especialidad: e,
      };
      this.firestore.setData(data, 'especialidad');
    }
  }

  getEspecialidades() {
    this.firestore.getData('especialidad').subscribe((q) => {
      this.especialidadArr = [];
      q.forEach((element) => {
        this.especialidadArr.push({
          id: element['id'],
          especialidad: element['especialidad'],
        });
      });
    });
  }

  get esRequerido(): boolean {
    if (this.toggleChecked) {
      return true;
    } else {
      return false;
    }
  }

  resolved(captcha: string) {
    this.captchaResponse = captcha;
    this.userForm.controls['captchaResponse'].setValue(this.captchaResponse);
  }
}
