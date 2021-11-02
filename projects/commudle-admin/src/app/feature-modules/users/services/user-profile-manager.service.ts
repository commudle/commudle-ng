import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileManagerService {
  private updateUsername: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateUsername$ = this.updateUsername.asObservable();

  private updateBasicInfo: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateBasicInfo$ = this.updateBasicInfo.asObservable();

  private updateSocialLinks: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateSocialLinks$ = this.updateSocialLinks.asObservable();

  private submitBasicInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  public submitBasicInfo$ = this.submitBasicInfo.asObservable();

  private submitSocialLinks: BehaviorSubject<any> = new BehaviorSubject(null);
  public submitSocialLinks$ = this.submitSocialLinks.asObservable();

  constructor() {}

  setUpdateUsername(value: boolean) {
    this.updateUsername.next(value);
  }

  setUpdateBasicInfo(value) {
    this.updateBasicInfo.next(value);
  }

  setUpdateSocialLinks(value) {
    this.updateSocialLinks.next(value);
  }

  setSubmitBasicInfo(value) {
    this.submitBasicInfo.next(value);
  }

  setSubmitSocialLinks(value) {
    this.submitSocialLinks.next(value);
  }
}
