import { Injectable } from '@angular/core';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { UserPersonalDiscussionChatNotificationsChannel } from 'projects/shared-services/websockets/user-personal-discussion-chat-notifications.channel';
import { BehaviorSubject, Observable } from 'rxjs';


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
    private userPersonalDiscussionChatNotificationsChannel: UserPersonalDiscussionChatNotificationsChannel,
    private authWatchService: LibAuthwatchService
  ) {
    this.getCurrentUser();
    this.getNewMessagesNotifications();
  }


  getCurrentUser() {
    this.authWatchService.currentUser$.subscribe(
      data => {
        if (data && !data.profile_completed) {
          this.sidebarNotifications.next(true);
          this.sideBarNotificationsList.user_profile = true;
        } else {
          this.sideBarNotificationsList.user_profile = false;
          this.resetSidebarNotifications();        }
      }
    )
  }


  getNewMessagesNotifications() {
    this.userPersonalDiscussionChatNotificationsChannel.newMessagesCounter$.subscribe(
      data => {
        if (data.length > 0) {
          this.sidebarNotifications.next(true);
          this.sideBarNotificationsList.personal_chat_message = true;
        } else {
          this.sideBarNotificationsList.personal_chat_message = false;
          this.resetSidebarNotifications();
        }
      }
    )
  }


  resetSidebarNotifications() {
    if (!Object.values(this.sideBarNotificationsList).includes(true)) {
      this.sidebarNotifications.next(false);
    }
  }




}
