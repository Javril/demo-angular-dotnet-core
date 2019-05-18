import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { IUser } from './IUser';
import { IRegister } from './IRegister';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
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
