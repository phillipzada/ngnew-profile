import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

    @Effect()
    getUser$ = this.actions$
        .ofType<UserActions.GetAction>(UserActions.GET_USER)
        .pipe(
            switchMap((action) => {
                return this.userService.getUser(action.payload);
            }),
            map((user) => {
                return new UserActions.LoadAction(user);
            }),
            catchError((error) => {
                console.error('USER GET EFFECT', error);
                return of(new UserActions.LoadAction(null));
            })
        );

    @Effect()
    saveUser$ = this.actions$
        .ofType<UserActions.SaveAction>(UserActions.SAVE_USER)
        .pipe(
            switchMap((action) => {
                return this.userService.saveUser(action.payload);
            }),
            map((user) => {
                if (user) {
                    return new UserActions.LoadAction(user);
                } else {
                    return of();
                }
            }),
            catchError((error) => {
                console.error('USER SAVE EFFECT', error);
                return of();
            })
        );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}
