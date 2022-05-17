import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationStateService {
  constructor() {}

  private closeNotificationPopover: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public closeNotificationPopover$ = this.closeNotificationPopover.asObservable();

  private notificationPageState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public notificationPageState$ = this.notificationPageState.asObservable();

  private notificationPopoverState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public notificationPopoverState$ = this.notificationPopoverState.asObservable();

  setCloseNotificationPopover(value: boolean) {
    this.closeNotificationPopover.next(value);
  }

  setNotificationPageState(value: boolean) {
    this.notificationPageState.next(value);
  }

  setNotificationPopoverState(value: boolean) {
    this.notificationPopoverState.next(value);
  }
}
