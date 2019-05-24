import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as FromApp from '../../store/app.reducers';
import * as FromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(
    private authService: AuthService,
    private store: Store<FromApp.AppState>
  ) { }

  ngOnInit() {
  }

  register = () => {
    this.authService.register(this.model)
      .subscribe(res => {
        console.log(res);
        this.store.dispatch(new AuthActions.Signin());
      }, err => {
          console.log(err);
      });
  }

  cancel = () => {
    this.cancelRegister.emit(false);
    this.store.dispatch(new AuthActions.Logout());
    console.log('Canceled');
  }

}
