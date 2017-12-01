import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const GET_USER = '[User] Get';
export const SAVE_USER = '[User] Save';
export const LOAD_USER = '[User] Load';

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

export type ActionTypes
  = GetAction
  | SaveAction
  | LoadAction
  ;
