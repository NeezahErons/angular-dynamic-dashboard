import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Endpoints from '../models/endpoints';
import { User, UsersResponse } from '../models';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private _isLoading = new BehaviorSubject<boolean>(false);
  public get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
  public set isLoading(v: boolean) {
    this._isLoading.next(v);
  }

  getAllUsers = (page: number) => {
    const params = new HttpParams({
      fromObject: { page }
    })
    this.isLoading = true;
    return this.http.get<UsersResponse>(Endpoints.getUsers, { params }).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  };

  getOneUserById = (id: string) => {
    this.isLoading = true;
    return this.http.get<User>(Endpoints.getUserById(id)).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  };
}
