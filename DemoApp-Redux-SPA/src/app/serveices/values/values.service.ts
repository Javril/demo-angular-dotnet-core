import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  constructor(private httpClient: HttpClient) { }

  getValues = () => {
    return this.httpClient.get('http://localhost:5000/api/values');
  }
}
