import {Action} from '@ngrx/store';

export class AuthState {
  jwt: string;
}

export interface AuthAction extends Action{
  type: string;
  payload?: any;
}
export class SetJWT implements AuthAction {
  type = 'SET_JWT';
  payload: string;

  constructor (token: string) {
    this.payload = token;
  }
}

export class Reset implements AuthAction {
  type = 'RESET';
}

const initialState = () =>
({
  jwt: localStorage.getItem('jwt')
});

const emptyState: AuthState = {
  jwt: ''
};

export function authReducer (state: AuthState = initialState(), action: AuthAction) {
  const newState = {
    ...state
  };
  switch (action.type) {
    case 'SET_JWT':
      newState.jwt = action.payload;
      break;
    case 'RESET':
      return emptyState;
  }
  return newState;
}
