import { Injectable } from '@angular/core';
import { AppSetting } from 'src/app/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
import { PaginatedResult } from 'src/app/models/IPagination';
import { map } from 'rxjs/operators';

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

  getUsers = (page?, itemsPerPage?, userParams?): Observable<PaginatedResult<IUser[]>> => {
    const paginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.httpClient.get<IUser[]>(`${this.baseUrl}/users`, { observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginatedResult;
      })
    );
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
