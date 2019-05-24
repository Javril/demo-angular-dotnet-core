import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { IRegister } from 'src/app/models/IRegister';
import { IUser } from 'src/app/models/IUser';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${AppSetting.API_ENDPOINT}/auth`;
  cancelRegister = new Subject<false>();

  constructor(private httpClient: HttpClient) { }

  register = (user: IRegister) => {
    return this.httpClient.post(`${this.url}/register`, user);
  }

  login = (user: IUser) => {
    return this.httpClient.post(`${this.url}/login`, user)
      .pipe(map((response: any) => {
        const foundUser = response;
        if (user) {
          localStorage.setItem('token', foundUser.token);
        }
      }));
  }

  loggedIn() {
    return !!localStorage.getItem('token'); // Get boolean value
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout = () => {
    localStorage.removeItem('token');
  }
}
