import { ActionReducer, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../models/user';

export const USERS_STATE_NAME = 'users';

export interface UserState {
  user: User;
}

export const InitialState: UserState = {
  user: null
};

export function userReducer(state = InitialState, action: UserActions.ActionTypes) {
  switch (action.type) {

    case UserActions.LOAD_USER:
      return {
        user: action.payload
      };

    default:
      return state;
  }
}
