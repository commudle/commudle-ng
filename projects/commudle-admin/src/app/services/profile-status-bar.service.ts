import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileStatusBarService {
  private profileBarStatus: Subject<boolean> = new Subject<boolean>();
  public profileBarStatus$ = this.profileBarStatus.asObservable();

  constructor() {}

  changeProfileBarStatus(value: boolean) {
    this.profileBarStatus.next(value);
  }
}
