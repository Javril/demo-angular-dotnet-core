import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/IUser';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers = (): Observable<IUser[]> => {
    return this.httpClient.get<IUser[]>(`${this.baseUrl}/users`);
  }

  getUser = (id: number): Observable<IUser> => {
    return this.httpClient.get<IUser>(`${this.baseUrl}/users/${id}`);
  }
}
