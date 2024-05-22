import { Injectable } from '@angular/core';
import { ESidebarPosition } from 'apps/shared-components/sidebar/enum/sidebar.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private setSidebar = {};
  public setSidebar$ = {};
  private hideSidebar = {};
  public hideSidebar$ = {};
  public sidebarPosition = {};
  public sidebarPosition$ = {};

  setSidebarVisibility(
    _id: string,
    expanded: boolean,
    hideSidebar: boolean = false,
    sidebarPosition: ESidebarPosition = ESidebarPosition.LEFT,
  ) {
    this.setSidebar[_id] = new BehaviorSubject(expanded);
    this.setSidebar$[_id] = this.setSidebar[_id].asObservable();
    this.hideSidebar[_id] = new BehaviorSubject(hideSidebar);
    this.hideSidebar$[_id] = this.hideSidebar[_id].asObservable();
    this.sidebarPosition[_id] = new BehaviorSubject(sidebarPosition);
    this.sidebarPosition$[_id] = this.sidebarPosition[_id].asObservable();
  }

  getSidebarVisibility(_id): Observable<boolean> {
    return this.setSidebar[_id].asObservable();
  }

  openSidebar(_id) {
    if (this.setSidebar[_id]) {
      this.setSidebar[_id].next(true);
    }
  }

  closeSidebar(_id) {
    if (this.setSidebar[_id]) {
      this.setSidebar[_id].next(false);
    }
  }

  toggleSidebarVisibility(_id) {
    if (this.setSidebar[_id]) {
      this.setSidebar[_id].next(!this.setSidebar[_id].getValue());
    }
  }
}
