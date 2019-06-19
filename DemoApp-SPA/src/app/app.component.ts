import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { IUser } from './models/IUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import {strings as frenchStrings} from 'ngx-timeago/language-strings/fr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  browserLang: string;

  constructor(
    private authService: AuthService,
    public intl: TimeagoIntl,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    this.browserLang = translate.getBrowserLang();
    translate.use(this.browserLang.match(/en|fr/) ? this.browserLang : 'en');

    console.log('browserLang: ', this.browserLang);

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
