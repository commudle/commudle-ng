import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationStateService {
  constructor() {}

  private closeNotificationPopover: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public closeNotificationPopover$ = this.closeNotificationPopover.asObservable();

  setCloseNotificationPopover(value: boolean) {
    this.closeNotificationPopover.next(value);
  }
}
