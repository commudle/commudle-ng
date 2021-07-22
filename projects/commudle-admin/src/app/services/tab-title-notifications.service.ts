import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommunityChannelNotificationsChannel } from '../feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { UserChatNotificationsChannel } from '../feature-modules/user-chats/services/websockets/user-chat-notifications.channel';

@Injectable({
  providedIn: 'root'
})
export class TabTitleNotificationsService {
  
  timeout;

  constructor(
    private titleService: Title,
    private userChatNotificationsChannel: UserChatNotificationsChannel,
    private communityChannelNotifications: CommunityChannelNotificationsChannel
  ) {

    this.getNotifications();
  }

  alterTitle(msg: string, count: number = 20): void {
    //Changes title text with notification
    const prevTitle = this.titleService.getTitle();
    const step = () => {

      const newTitle = this.titleService.getTitle() === prevTitle ? msg : prevTitle;
      this.titleService.setTitle(newTitle);

      if (--count && document.visibilityState=="hidden") {
        this.timeout = setTimeout(step, 100);
      } else {
        this.titleService.setTitle(prevTitle);
      }
    };
    
    clearTimeout(this.timeout);
    step();
  }

  getNotifications() {
    //Gets new notifications from other components
    this.userChatNotificationsChannel.newMessagesCounter$.subscribe(value => {
        if(document.visibilityState == "hidden" && value.length>0) {
          this.alterTitle(`${value[value.length-1].user.name} has messaged you`);
        }
    });
  }
}

