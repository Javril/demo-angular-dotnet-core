import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { IUser } from './IUser';
import { IRegister } from './IRegister';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${AppSetting.API_ENDPOINT}/values`;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.url}`);
  }
}
