import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { IRegister } from 'src/app/models/IRegister';
import { IUser } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${AppSetting.API_ENDPOINT}/auth`;

  constructor(private httpClient: HttpClient) { }

  register = (user: IRegister) => {
    return this.httpClient.post(`${this.url}/register`, user);
  }

  login = (user: IUser) => {
    return this.httpClient.post(`${this.url}/login`, user);
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
