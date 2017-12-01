import { USERS_STATE_NAME, UserState } from './user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>(USERS_STATE_NAME);

export const selectUser = createSelector(selectUserState, (state) => state.user);
