import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActions } from './user.actions';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  userUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUsers),
      concatMap(({ page: pageNumber }) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.api.getAllUsers(pageNumber).pipe(
          map(({ data, ...page }) =>
            UserActions.usersSuccess({ data, page })
          ),
          catchError((error) => of(UserActions.usersFailure({ error })))
        )
      )
    );
  });

  selectUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.selectUser),
        tap(() => {
          this.router.navigate(['user']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private api: ApiService,
    private router: Router
  ) {}
}
