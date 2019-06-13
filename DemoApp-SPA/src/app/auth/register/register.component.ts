import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { IUser } from 'src/app/models/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: FormGroup;
  user: IUser;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  get username() {
    return this.registerForm.get('username');
  }

  get knownAs() {
    return this.registerForm.get('knownAs');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }

  get city() {
    return this.registerForm.get('city');
  }

  get country() {
    return this.registerForm.get('country');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  register = () => {
    if (this.registerForm.valid) {
      this.user = { ...this.registerForm.value };
      console.log(this.user);
      this.authService.register(this.user)
        .subscribe(() => {
          this.alertify.success('Register successfully');
        }, err => {
            this.alertify.error(err);
          }, () => {
            this.authService.login(this.user)
              .subscribe(() => {
                this.router.navigate(['/members']);
                this.alertify.success('Login successfully');
              });
        });
    }
  }

  reset = () => {
    this.registerForm.reset();
  }

  cancel = () => {
    this.authService.cancelRegister.next(false);
  }

}
