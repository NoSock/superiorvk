import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Reset, SetJWT} from './auth-state';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  addJWTEvent$ = this.actions$.pipe(
    ofType<SetJWT>('SET_JWT'),
    tap(action =>
      localStorage.setItem('jwt', action.payload)
    )
  );

  @Effect({dispatch: false})
  resetEvent$ = this.actions$.pipe(
    ofType<Reset>('RESET'),
    tap(action =>
      localStorage.removeItem('jwt')
    )
  );

  constructor(private actions$: Actions) {}
}
