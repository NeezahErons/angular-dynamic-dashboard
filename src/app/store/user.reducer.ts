import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { PaginatorInfo, User } from '../models';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
  selectedUserId: number | undefined;
  page: PaginatorInfo;
}

export const initialState: State = {
  users: [],
  selectedUserId: undefined,
  page: {} as PaginatorInfo,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.getUsers, (state) => state),
  on(UserActions.usersSuccess, (state, action) => ({
    ...state,
    users: action.data,
    page: action.page,
  })),
  on(UserActions.usersFailure, (state, action) => state),
  on(UserActions.selectUser, (state, action) => ({
    ...state,
    selectedUserId: action.id,
  }))
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
