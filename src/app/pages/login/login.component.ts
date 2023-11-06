import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.login(
        this.userForm.get('email')?.value,
        this.userForm.get('password')?.value
      )
        .then((e) => {
          this.authS.setUsuarioLogueado(true);
          this.route.navigate(['/home']);
        })
        .catch((e) => {
          console.log(e.error);
        });
      this.toast.show('Ingreso aceptado', 'Logueado con exito!!');
      this.userForm.reset();
    }
  }

  irRegistro() {
    this.route.navigate(['/registro']);
  }

  async login(email: string, password: string) {
    await this.authS.loguearse(email, password);
  }
}
