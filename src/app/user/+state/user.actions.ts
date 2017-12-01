import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const GET_USER = '[User] Get';
export const SAVE_USER = '[User] Save';
export const LOAD_USER = '[User] Load';
export const USER_ERROR = '[User] Error';

export class GetAction implements Action {
  readonly type = GET_USER;
  constructor(public payload: number) { }
}

export class SaveAction implements Action {
  readonly type = SAVE_USER;
  constructor(public payload: User) { }
}

export class LoadAction implements Action {
    readonly type = LOAD_USER;
    constructor(public payload: User) { }
}

export class ErrorAction implements Action {
  readonly type = USER_ERROR;
  constructor(public payload: string) { }
}

export type ActionTypes
  = GetAction
  | SaveAction
  | LoadAction
  | ErrorAction
  ;
