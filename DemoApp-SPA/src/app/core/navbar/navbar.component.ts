import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { IUser } from 'src/app/services/users/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  model: IUser = {username: '', password: ''};
  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
  }

  login = () => {
    this.usersService.login(this.model)
      .subscribe((res: any) => {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/values']);
      }, err => {
          console.log(err);
      });
  }

  loggedIn = () => {
    return this.usersService.loggedIn();
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['']);
    console.log('Loggedout');
  }

}
