import { Component } from '@angular/core';
import { State as userState } from '../../store/user.reducer';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../store/user.selectors';
import { AsyncPipe, Location } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(private store: Store<userState>, private location: Location) {}

  item = this.store.select(selectSelectedUser);

  back = () => {
    this.location.back();
  };
}
