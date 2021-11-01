import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileManagerService {
  private updateUsername: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateUsername$ = this.updateUsername.asObservable();

  constructor() {}

  setUpdateUsername(value: boolean) {
    this.updateUsername.next(value);
  }
}
