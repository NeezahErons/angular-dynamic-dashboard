import { createActionGroup, props } from '@ngrx/store';
import { PaginatorInfo, User } from '../models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get Users': props<{ page: number }>(),
    'Users Success': props<{ data: User[]; page: PaginatorInfo }>(),
    'Users Failure': props<{ error: unknown }>(),
    'Select User': props<{ id: number }>(),
  },
});
