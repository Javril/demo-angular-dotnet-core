import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  register = () => {
    this.usersService.register(this.model)
      .subscribe(res => {
        console.log(res);
      }, err => {
          console.log(err);
      });
  }

  cancel = () => {
    this.cancelRegister.emit(false);
    console.log('Canceled');
  }

}
