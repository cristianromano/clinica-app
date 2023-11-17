import { Component } from '@angular/core';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userForm!: FormGroup;
  auth?: any;
  toggleChecked: boolean = false;
  esAdmin: string = 'users';
  pacientes: any = [];
  especialistas: any = [];
  admin: any = [];

  private usersSubscription?: Subscription;
  private adminSubscription?: Subscription;

  constructor(
    private toast: ToastrService,
    private firestore: FirebaseService,
    private route: Router,
    private authS: AuthService
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.especialistas = [];
    this.admin = [];
    this.pacientes = [];

    this.adminSubscription = this.firestore.getData('admin').subscribe((e) => {
      e.forEach((element) => {
        if (this.admin.length < 1 && !this.admin.includes(element)) {
          this.admin.push(element);
        }
      });
    });

    this.usersSubscription = this.firestore.getData('users').subscribe((e) => {
      e.forEach((element) => {
        if (element['especialidad'] == 'null' && this.pacientes.length < 3) {
          this.pacientes.push(element);
        }
        if (
          element['especialidad'] != '' &&
          element['especialidad'] != 'null' &&
          this.especialistas.length < 2
        ) {
          this.especialistas.push(element);
        }
      });
      this.especialistas = this.especialistas.slice(0, 2);
      console.log(this.especialistas);
      console.log(this.pacientes);
    });
  }

  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    if (this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }

    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  async onSubmit() {
    try {
      let verificado = await this.firestore.verificarEstado(
        this.esAdmin,
        this.userForm.get('email')?.value
      );
      if (verificado) {
        if (this.userForm.valid) {
          this.authS
            .loguearse(
              this.userForm.get('email')?.value,
              this.userForm.get('password')?.value
            )
            .then((e) => {
              if (e.user.emailVerified == true) {
                //this.authS.setUser(e.user);
                //this.authS.setUsuarioLogueado(true);
                this.toast.show('Ingreso aceptado', 'Logueado con exito!!');
                this.userForm.reset();
                this.route.navigate(['/home']);
              } else {
                this.toast.show(
                  'Ingreso denegado',
                  'Debe verificar su correo electronico!'
                );
                this.authS.enviarMail(e.user);
              }
            });
        }
      } else {
        this.toast.show('Ingreso denegado', 'Debe aprobarse la cuenta');
      }
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }

  irRegistro() {
    this.route.navigate(['/registro']);
  }

  /* async login(email: string, password: string) {
    await this.authS.loguearse(email, password);
  }
*/
  loginRapido() {
    this.authS.loguearse('cr@gmail.com', 'asdasd123').then((e) => {
      console.log(e);
      this.toast.show('Ingreso aceptado', 'Logueado con exito!!');
      this.userForm.reset();
      this.route.navigate(['/home']);
    });
  }

  toggleChanged(checked: boolean) {
    this.toggleChecked = checked;
    if (this.toggleChecked) {
      this.esAdmin = 'admin';
    } else {
      this.esAdmin = 'users';
    }
  }

  accederAdmin(item: any) {
    this.authS.loguearse(item.email, item.password).then((e) => {
      console.log(e);
      this.toast.show('Ingreso aceptado', 'Logueado con exito!!');
      this.userForm.reset();
      this.route.navigate(['/home']);
    });
  }

  accederEspecialista(item: any) {
    this.authS.loguearse(item.email, item.password).then((e) => {
      console.log(e);
      this.toast.show('Ingreso aceptado', 'Logueado con exito!!');
      this.userForm.reset();
      this.route.navigate(['/home']);
    });
  }

  accederPaciente(item: any) {
    this.authS.loguearse(item.email, item.password).then((e) => {
      console.log(e);
      this.toast.show('Ingreso aceptado', 'Logueado con exito!!');
      this.userForm.reset();
      this.route.navigate(['/home']);
    });
  }
}
