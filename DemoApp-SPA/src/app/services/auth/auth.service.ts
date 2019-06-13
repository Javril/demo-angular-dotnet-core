import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { IRegister } from 'src/app/models/IRegister';
import { IUser } from 'src/app/models/IUser';
import { Subject, from, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  cancelRegister = new Subject<false>();
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: IUser;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private httpClient: HttpClient) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login = (model: IUser) => {
    return this.httpClient.post(`${this.baseUrl}/login`, model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.getDecodedToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
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

  register = (user: IUser) => {
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }

  getDecodedToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
}
