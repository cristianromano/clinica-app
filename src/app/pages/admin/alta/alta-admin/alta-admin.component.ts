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

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss'],
})
export class AltaAdminComponent {
  userForm!: FormGroup;
  file?: any;
  foto?: any;
  usuario: User[] = [];
  especialidadNueva?: string;

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
    });
  }
  ngOnInit() {}

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
        admin: true,
      };
      this.auth
        .registrarse(
          this.userForm.get('email')?.value,
          this.userForm.get('password')?.value
        )
        .then((e) => {
          this.uploadFile().then((e) => {
            this.auth.actualizarUsuario(this.foto);
            usuario.imagen = this.foto;
            this.firestore.setData(usuario, 'admin');
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

  irAdmin() {
    this.route.navigate(['/admin']);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  async uploadFile() {
    if (this.file) {
      this.foto = await this.storage.subirArchivo(this.file, 'perfil');
    }
  }
}
