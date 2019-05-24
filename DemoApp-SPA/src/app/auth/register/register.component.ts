import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: NgForm;
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register = () => {
    this.authService.register(this.model)
      .subscribe(res => {
        console.log(res);
      }, err => {
          console.log(err);
      });
  }

  reset = () => {
    console.log('reset');
    this.registerForm.reset();
    console.log(this.registerForm);
  }

  cancel = () => {
    this.authService.cancelRegister.next(false);
    console.log('Canceled');
  }

}
