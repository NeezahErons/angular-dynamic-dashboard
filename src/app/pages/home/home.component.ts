import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State as UserState } from '../../store/user.reducer';
import { Observable, Subscription, iif, map, of } from 'rxjs';
import { PaginatorInfo, User } from '../../models';
import {
  filteredUserList,
  selectAllUsers,
  selectPaginator,
} from '../../store/user.selectors';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserActions } from '../../store/user.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatPaginator, AsyncPipe, MatProgressSpinner, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private store: Store<UserState>, private api: ApiService) {}

  usersList$!: Observable<User[]>;
  page$!: Observable<PaginatorInfo>;

  sub1!: Subscription;
  sub2!: Subscription;

  loading!: boolean;

  searchTerm = '';

  search(term: string) {
    // term;
    if (term) {
      this.usersList$ = this.store.select(filteredUserList(+term));
    } else {
      this.usersList$ = this.store.select(selectAllUsers);
    }
  }

  ngOnInit(): void {
    this.sub2 = this.api.isLoading.subscribe((val) => {
      this.loading = val;
    });
    this.sub1 = this.store.select(selectAllUsers).subscribe((data) => {
      if (data?.length === 0) {
        this.store.dispatch(UserActions.getUsers({ page: 1 }));
      } else {
        this.usersList$ = this.store.select(selectAllUsers);
        this.page$ = this.store.select(selectPaginator);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
  }

  onPageEvent(p: PageEvent) {
    this.store.dispatch(UserActions.getUsers({ page: p.pageIndex + 1 }));
  }

  viewUser(id: number) {
    this.store.dispatch(UserActions.selectUser({ id }));
  }
}
