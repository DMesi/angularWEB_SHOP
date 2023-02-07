import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../app/_interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiURL = "https://localhost:44365/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }


  register(register: User): Observable<User> {

  return this.httpClient.post<User>(this.apiURL + '/Account/register', JSON.stringify(register), this.httpOptions);

  }

  login(login: User): Observable<User> {

    return this.httpClient.post<User>(this.apiURL + '/Account/login', JSON.stringify(login), this.httpOptions);

    }

  }
