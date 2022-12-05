import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileService {
  private updateProfile: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateProfile$ = this.updateProfile.asObservable();

  constructor() {}

  setUpdateProfileStatus(value: boolean) {
    this.updateProfile.next(value);
  }
}
