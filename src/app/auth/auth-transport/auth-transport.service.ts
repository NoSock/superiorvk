import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, first, map, mapTo, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {AppState} from '../../app-state';
import {Reset, SetJWT} from './auth-state/auth-state';

@Injectable()
export class AuthTransportService {
  private apiUrl = environment.domain + 'api/';
  private token: string;

  isAuthenticated: BehaviorSubject<boolean>;
  vkAuthUrl = 'https://oauth.vk.com/authorize?' +
    `client_id=${environment.vkAppId}&display=page&redirect_uri=` +
    `${environment.domain}auth/login&scope=` +
    'messages|offline&response_type=code&v=5.80&' +
    'state=vk-redirect';

  constructor(private http: HttpClient,
              private store: Store<AppState>) {
    this.isAuthenticated = new BehaviorSubject<boolean>(false);
    this.store.select('auth', 'jwt' )
      .subscribe(token => {
      this.token = token;
    });
  }

  private getFromApi(endpoint: string): Observable<{[key: string]: any}> {
    return this.http.get(this.apiUrl + endpoint, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      observe: 'response',
    }).pipe(
      tap(resp => this.applyAuthResponse(resp)),
      first()
    );
  }

  private postToApi(endpoint: string, body: {[key: string]: any}): Observable<{[key: string]: any}> {
    return this.http.post(this.apiUrl + endpoint, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${this.token}`
      },
      observe: 'response',
    }).pipe(
      tap(resp => this.applyAuthResponse(resp)),
      map (response => response.body),
      first(),
    );
  }

  private applyAuthResponse(res: HttpResponse<Object>) {
    if (!res) {
      return;
    }
    const authSchema = res.headers.get('Authorization') ?
      res.headers.get('Authorization').split(' ') :
      [];
    if (authSchema[0] === 'Bearer' && authSchema[1]) {
      this.store.dispatch(new SetJWT(authSchema[1]));
    }

    if (typeof res.body['auth'] === 'boolean') {
      this.isAuthenticated.next(res.body['auth']);
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

  checkJwt() {
    return this.getFromApi('secure/test').pipe(
      first(),
      mapTo(true),
      catchError(() => {
        return of(false);
      })
    );
  }

  logOut() {
    this.store.dispatch(new Reset());
  }
}
