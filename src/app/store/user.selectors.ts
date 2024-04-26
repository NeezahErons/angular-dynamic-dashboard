import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectAllUsers = createSelector(
  selectUserState,
  state => state?.users,
)
export const selectPaginator = createSelector(
  selectUserState,
  state => state?.page,
)
export const selectSelectedUser = createSelector(
  selectUserState,
  state => state.users.find(user => user.id === state.selectedUserId)
)
export const filteredUserList = (id: number) => createSelector(
  selectAllUsers,
  users => users.filter(user => user.id === id)
)