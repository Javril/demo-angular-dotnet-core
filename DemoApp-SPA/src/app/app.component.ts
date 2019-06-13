import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { IUser } from './models/IUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TimeagoIntl } from 'ngx-timeago';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    intl: TimeagoIntl
  ) {
    intl.strings = englishStrings;
    intl.changes.next();
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
    // if (this.authService.loggedIn()) {
    //   const token = localStorage.getItem('token');
    //   const user: IUser = JSON.parse(localStorage.getItem('user'));
    //   if (token) {
    //     this.authService.decodedToken = this.authService.decodedToken;
    //   }
    //   if (user) {
    //     this.authService.currentUser = user;
    //     this.authService.changeMemberPhoto(user.photoUrl);
    //   }
    // }
  }

}
