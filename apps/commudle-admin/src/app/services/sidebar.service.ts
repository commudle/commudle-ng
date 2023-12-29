import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface SidebarState {
  expanded: BehaviorSubject<boolean>;
  hidden: BehaviorSubject<boolean>;
  url: BehaviorSubject<string>;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private setSidebar: { [key: string]: SidebarState } = {};

  constructor() {}

  setSidebarVisibility(eventName: string, expanded: boolean = false, hidden: boolean = false, url?: string) {
    this.setSidebar[eventName] = {
      expanded: new BehaviorSubject(expanded), // default value for side whether it's open or closed
      hidden: new BehaviorSubject(hidden), // value for sidebar is hidden properly or not
      url: new BehaviorSubject(url || ''), //url for iframe is required or not
    };
  }

  getSidebarState(eventName: string): SidebarState {
    return this.setSidebar[eventName];
  }

  getSidebarVisibility(eventName: string): Observable<boolean> {
    return this.setSidebar[eventName].expanded.asObservable();
  }

  toggleSidebarVisibility(eventName: string) {
    if (this.setSidebar[eventName]) {
      this.setSidebar[eventName].expanded.next(!this.setSidebar[eventName].expanded.getValue());
    }
  }
}
