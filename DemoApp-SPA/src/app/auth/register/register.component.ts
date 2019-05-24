import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: NgForm;
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
  }

  register = () => {
    this.authService.register(this.model)
      .subscribe(res => {
        this.alertifyService.success('Register successfully');
      }, err => {
          this.alertifyService.error(err);
      });
  }

  reset = () => {
    this.registerForm.reset();
  }

  cancel = () => {
    this.authService.cancelRegister.next(false);
  }

}
