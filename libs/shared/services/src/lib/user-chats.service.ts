import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserChatsService {
  private followerIdChange: Subject<number> = new Subject<number>();
  public followerIdChange$ = this.followerIdChange.asObservable();

  constructor() {}

  changeFollowerId(value: number) {
    this.followerIdChange.next(value);
  }
}
