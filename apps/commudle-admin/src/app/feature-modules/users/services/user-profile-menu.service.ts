import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MenuItemNames =
  | 'about'
  | 'badges'
  | 'builds'
  | 'talksAtEvents'
  | 'communities'
  | 'labs'
  | 'resume'
  | 'workHistory'
  | 'content'
  | 'feed';

export type UserProfileMenuItems = Record<
  MenuItemNames,
  { name: string; icon: string; icon_status: string; link: string; active: boolean }
>;

@Injectable({
  providedIn: 'root',
})
export class UserProfileMenuService {
  userProfileMenuItems: UserProfileMenuItems = {
    about: {
      name: 'About',
      icon: 'alert-circle',
      icon_status: 'primary',
      link: 'about',
      active: false,
    },
    badges: {
      name: 'Badges',
      icon: 'award',
      icon_status: 'warning',
      link: 'badges',
      active: false,
    },
    builds: {
      name: 'Builds',
      icon: 'bulb',
      icon_status: 'success',
      link: 'builds',
      active: false,
    },
    talksAtEvents: {
      name: 'Talks at Events',
      icon: 'calendar',
      icon_status: 'info',
      link: 'talks-at-events',
      active: false,
    },
    communities: {
      name: 'Communities',
      icon: 'people',
      icon_status: 'warning',
      link: 'communities',
      active: false,
    },
    labs: {
      name: 'Labs',
      icon: 'book-open',
      icon_status: 'danger',
      link: 'labs',
      active: false,
    },
    resume: {
      name: 'Resume',
      icon: 'clipboard',
      icon_status: 'info',
      link: 'resume',
      active: false,
    },
    workHistory: {
      name: 'Work History',
      icon: 'briefcase',
      icon_status: 'success',
      link: 'work-history',
      active: false,
    },
    content: {
      name: 'Content',
      icon: 'file-text',
      icon_status: 'info',
      link: 'content',
      active: false,
    },
    feed: {
      name: 'Feed',
      icon: 'cast',
      icon_status: 'primary',
      link: 'feed',
      active: false,
    },
  };

  private activeMenuItems = new BehaviorSubject<UserProfileMenuItems>(this.userProfileMenuItems);
  public activeMenuItems$ = this.activeMenuItems.asObservable();

  constructor() {}

  addMenuItem(item: MenuItemNames, value: boolean) {
    this.userProfileMenuItems[item].active = value;
    this.activeMenuItems.next(this.userProfileMenuItems);
  }
}
