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

  updateUser = (id: number, user: IUser) => {
    return this.httpClient.put(`${this.baseUrl}/users/${id}`, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.httpClient.post(`${this.baseUrl}/users/${userId}/photos/${id}/setMain`, {});
  }

  deletePhoto(userId: number, id: number) {
    return this.httpClient.delete(`${this.baseUrl}/users/${userId}/photos/${id}`);
  }
}
