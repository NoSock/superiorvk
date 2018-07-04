import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

interface AuthResponse {
  auth?: boolean;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthTransportService {
  private apiUrl = environment.domain + 'api/';
  private token: string;

  isAuthenticated: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isAuthenticated = new BehaviorSubject<boolean>(false);
  }

  private postToApi(endpoint: string, body: {[key: string]: any}): Observable<{[key: string]: any}> {
    return this.http.post(this.apiUrl + endpoint, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      observe: 'response',
    }).pipe(
      filter (response => response.status === 200),
      map (response => response.body),
      tap (value => this.parseResponse(value))
    );
  }

  private parseResponse(res: AuthResponse) {
    if (typeof res.auth === 'boolean') {
      this.isAuthenticated.next(res.auth);
    }
    if (typeof res.token === 'string') {
      this.token = res.token;
    }
  }

  login(login: string, password: string): Observable<{[key: string]: any}> {
    return this.postToApi('authenticate', {
      method: 'password',
      payload: {
        login,
        password
      }
    });
  }

  register(login: string, password: string): Observable<{[key: string]: any}> {
    return this.postToApi('register', {
      login,
      password
    });
  }
}
