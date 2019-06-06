import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { IRegister } from 'src/app/models/IRegister';
import { IUser } from 'src/app/models/IUser';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${AppSetting.API_ENDPOINT}/auth`;
  cancelRegister = new Subject<false>();
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private httpClient: HttpClient) { }

  register = (user: IRegister) => {
    return this.httpClient.post(`${this.url}/register`, user);
  }

  login = (model: IUser) => {
    return this.httpClient.post(`${this.url}/login`, model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.getDecodedToken(user.token);
        }
      }));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    this.decodedToken = this.getDecodedToken(token);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout = () => {
    localStorage.removeItem('token');
  }

  getDecodedToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
}
