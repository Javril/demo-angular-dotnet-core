import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { IUser } from './models/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      const token = localStorage.getItem('token');
      const user: IUser = JSON.parse(localStorage.getItem('user'));
      if (token) {
        this.authService.decodedToken = this.authService.decodedToken;
      }
      if (user) {
        this.authService.currentUser = user;
        this.authService.changeMemberPhoto(user.photoUrl);
      }
    }
  }

}
