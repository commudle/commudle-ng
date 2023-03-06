import { Injectable } from '@angular/core';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { BehaviorSubject } from 'rxjs';
import {
  faExclamationCircle,
  faCalendar,
  faUsers,
  faBookOpen,
  faBriefcase,
  faBuilding,
  faFileText,
  faClipboard,
  faLightbulb,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import { faChromecast } from '@fortawesome/free-brands-svg-icons';

export type MenuItemNames =
  | 'about'
  | 'badges'
  | 'builds'
  | 'talksAtEvents'
  | 'communities'
  | 'labs'
  | 'jobs'
  | 'resume'
  | 'workHistory'
  | 'content'
  | 'feed';

export type UserProfileMenuItems = Record<
  MenuItemNames,
  { name: string; icon: any; active_color: string; link: string; active: boolean }
>;

@Injectable({
  providedIn: 'root',
})
export class UserProfileMenuService {
  userProfileMenuItems: UserProfileMenuItems = {
    about: {
      name: 'About',
      icon: faExclamationCircle,
      active_color: 'com-text-primary-500',
      link: 'about',
      active: false,
    },
    badges: {
      name: 'Badges',
      icon: faAward,
      active_color: 'com-text-Chrome-Yellow',
      link: 'badges',
      active: false,
    },
    builds: {
      name: 'Builds',
      icon: faLightbulb,
      active_color: 'com-text-Caribbean-Green',
      link: 'builds',
      active: false,
    },
    talksAtEvents: {
      name: 'Talks at Events',
      icon: faCalendar,
      active_color: 'com-text-Azure',
      link: 'talks-at-events',
      active: false,
    },
    communities: {
      name: 'Communities',
      icon: faUsers,
      active_color: 'com-text-Chrome-Yellow',
      link: 'communities',
      active: false,
    },
    labs: {
      name: 'Labs',
      icon: faBookOpen,
      active_color: 'com-text-Infra-Red',
      link: 'labs',
      active: false,
    },
    jobs: {
      name: 'Jobs',
      icon: faBriefcase,
      active_color: 'com-text-primary-500',
      link: 'jobs',
      active: false,
    },
    resume: {
      name: 'Resume',
      icon: faClipboard,
      active_color: 'com-text-Azure',
      link: 'resume',
      active: false,
    },
    workHistory: {
      name: 'Work History',
      icon: faBuilding,
      active_color: 'com-text-Caribbean-Green',
      link: 'work-history',
      active: false,
    },
    content: {
      name: 'Content',
      icon: faFileText,
      active_color: 'com-text-Azure',
      link: 'content',
      active: false,
    },
    feed: {
      name: 'Feed',
      icon: faChromecast,
      active_color: 'com-text-primary-500',
      link: 'feed',
      active: false,
    },
  };

  private activeMenuItems = new BehaviorSubject<UserProfileMenuItems>(this.userProfileMenuItems);
  public activeMenuItems$ = this.activeMenuItems.asObservable();

  hiring = false;
  constructor(private userProfileManagerService: UserProfileManagerService) {}

  addMenuItem(item: MenuItemNames, value: boolean) {
    this.userProfileMenuItems[item].active = value;
    this.activeMenuItems.next(this.userProfileMenuItems);
  }
}
