import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import {strings as frenchStrings} from 'ngx-timeago/language-strings/fr';
import { TranslateService } from '@ngx-translate/core';
import { TimeagoIntl } from 'ngx-timeago';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: string;
  photoUrl: string;
  defaultPhotoUrl: string;
  isOpen = false;
  isMenuOpen = false;
  model: any = {username: '', password: ''};
  constructor(
    private router: Router,
    public authService: AuthService,
    private alertify: AlertifyService,
    public translate: TranslateService,
    public intl: TimeagoIntl
  ) { }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
      if (!this.photoUrl) {
        this.defaultPhotoUrl = JSON.parse(localStorage.getItem('user')).gender ===
        'male' ? '../../assets/male.png' : '../../assets/female.png';
      }
    });
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  changeTimeAgo = (lang: string) => {
    this.intl.strings = lang === 'en' ? englishStrings : frenchStrings;
    this.intl.changes.next();
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
