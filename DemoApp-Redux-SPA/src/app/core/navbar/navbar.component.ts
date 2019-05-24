import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/services/users/IUser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import * as FromApp from '../../store/app.reducers';
import * as FromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  model: IUser = { username: '', password: '' };
  authState: Observable<FromAuth.State>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<FromApp.AppState>
  ) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  login = () => {
    this.authService.login(this.model)
      .subscribe((res: any) => {
        console.log(res.token);
        this.store.dispatch(new AuthActions.Signup());
        localStorage.setItem('token', res.token);
        this.router.navigate(['/values']);
      }, err => {
          console.log(err);
      });
  }

  loggedIn = () => {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['']);
    console.log('Loggedout');
  }

}
