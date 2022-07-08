import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MenuItemNames =
  | 'about'
  | 'badges'
  | 'builds'
  | 'talksAtEvents'
  | 'communities'
  | 'labs'
  | 'workHistory'
  | 'content'
  | 'feed';

export type UserProfileMenuItems = Record<MenuItemNames, { name: string; icon: string; link: string; active: boolean }>;

@Injectable({
  providedIn: 'root',
})
export class UserProfileMenuService {
  userProfileMenuItems: UserProfileMenuItems = {
    about: {
      name: 'About',
      icon: 'fa-user',
      link: 'about',
      active: false,
    },
    badges: {
      name: 'Badges',
      icon: 'fa-certificate',
      link: 'badges',
      active: false,
    },
    builds: {
      name: 'Builds',
      icon: 'fa-cogs',
      link: 'builds',
      active: false,
    },
    talksAtEvents: {
      name: 'Talks at Events',
      icon: 'fa-microphone',
      link: 'talks-at-events',
      active: false,
    },
    communities: {
      name: 'Communities',
      icon: 'fa-users',
      link: 'communities',
      active: false,
    },
    labs: {
      name: 'Labs',
      icon: 'fa-flask',
      link: 'labs',
      active: false,
    },
    workHistory: {
      name: 'Work History',
      icon: 'fa-briefcase',
      link: 'work-history',
      active: false,
    },
    content: {
      name: 'Content',
      icon: 'fa-file-text',
      link: 'content',
      active: false,
    },
    feed: {
      name: 'Feed',
      icon: 'fa-rss',
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
