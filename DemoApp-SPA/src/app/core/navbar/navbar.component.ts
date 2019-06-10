import { Component, OnInit } from '@angular/core';
// import { IUser } from 'src/app/services/users/IUser';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: string;
  photoUrl: string;
  isOpen = false;
  isMenuOpen = false;
  model: any = {username: '', password: ''};
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    if (this.loggedIn()) {
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
      this.user = this.authService.decodedToken.unique_name;
    }
  }

  login = () => {
    this.authService.login(this.model)
      .subscribe(next => {
        this.user = this.authService.decodedToken.unique_name;
        this.alertifyService.success('Logged in successfully');
      }, err => {
          this.alertifyService.error(err);
      }, () => {
        this.isOpen = false;
        this.router.navigate(['/members']);
      });
  }

  loggedIn = () => {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.alertifyService.message('Logged out');
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
