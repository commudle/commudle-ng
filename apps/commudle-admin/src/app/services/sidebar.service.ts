import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private setSidebarEvent = {};
  public setSidebarEvent$ = {};
  private showFull = {};
  public showFull$ = {};

  constructor() {}

  setEvent(eventName: string, value) {
    this.setSidebarEvent[eventName] = new BehaviorSubject(value);
    this.setSidebarEvent$[eventName] = this.setSidebarEvent[eventName].asObservable();
    this.showFull[eventName] = new BehaviorSubject(false);
    this.showFull$[eventName] = this.showFull[eventName].asObservable();
  }

  getSidebarVisibility(eventName): Observable<boolean> {
    return this.setSidebarEvent[eventName].asObservable();
  }

  toggleSidebarEvent(eventName) {
    if (this.setSidebarEvent[eventName]) {
      this.setSidebarEvent[eventName].next(!this.setSidebarEvent[eventName].getValue());
    }
  }

  setVariant(eventName, data: boolean) {
    this.showFull[eventName].next(data);
  }
}
