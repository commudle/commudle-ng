import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private setSidebar = {};
  public setSidebar$ = {};
  private hideSidebar = {};
  public hideSidebar$ = {};

  constructor() {}

  setSidebarVisibility(eventName: string, expanded: boolean, hideSidebar: boolean = false) {
    this.setSidebar[eventName] = new BehaviorSubject(expanded);
    this.setSidebar$[eventName] = this.setSidebar[eventName].asObservable();
    this.hideSidebar[eventName] = new BehaviorSubject(hideSidebar);
    this.hideSidebar$[eventName] = this.hideSidebar[eventName].asObservable();
  }

  getSidebarVisibility(eventName): Observable<boolean> {
    return this.setSidebar[eventName].asObservable();
  }

  toggleSidebarVisibility(eventName) {
    if (this.setSidebar[eventName]) {
      this.setSidebar[eventName].next(!this.setSidebar[eventName].getValue());
    }
  }

  setVariant(eventName, data: boolean) {
    this.hideSidebar[eventName].next(data);
  }
}
