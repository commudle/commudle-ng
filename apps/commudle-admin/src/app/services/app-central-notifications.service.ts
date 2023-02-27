import {Injectable} from '@angular/core';
import {LibAuthwatchService} from 'apps/shared-services/lib-authwatch.service';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppCentralNotificationService {
  sideBarNotificationsList = {
    user_profile: false,
    personal_chat_message: false
  };

  private sidebarNotifications: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public sidebarNotifications$ = this.sidebarNotifications.asObservable();

  private notifications: BehaviorSubject<any> = new BehaviorSubject(false);
  public notifications$ = this.notifications.asObservable();

  constructor(
    private authWatchService: LibAuthwatchService
  ) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authWatchService.currentUser$.subscribe(
      data => {
        if (data && !data.profile_completed) {
          this.sidebarNotifications.next(true);
          this.sideBarNotificationsList.user_profile = true;
        } else {
          this.sideBarNotificationsList.user_profile = false;
          this.resetSidebarNotifications();
        }
      }
    );
  }

  resetSidebarNotifications() {
    if (!Object.values(this.sideBarNotificationsList).includes(true)) {
      this.sidebarNotifications.next(false);
    }
  }
}
