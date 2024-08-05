import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserChatNotificationsChannel } from 'apps/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-notifications.channel';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IDiscussionFollower } from 'apps/shared-models/discussion-follower.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import moment from 'moment';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit {
  @Input() currentUser: ICurrentUser;
  @Input() allPersonalChatUsers: IDiscussionFollower[];
  @Output() getChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();
  @Output() moveUserToTop: EventEmitter<IDiscussionFollower[]> = new EventEmitter<IDiscussionFollower[]>();
  selectedChatUser: IDiscussionFollower;

  showLiveStatus = false;
  showChat = false;
  unreadCount = 0;
  moment = moment;

  constructor(
    private authWatchService: LibAuthwatchService,
    private userChatNotificationsChannel: UserChatNotificationsChannel,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => (this.showLiveStatus = !!data));

    this.userChatNotificationsChannel.subscribe();

    // Live update for new messages
    this.liveUpdates();
  }

  openChat(chatUser) {
    this.selectedChatUser = chatUser;
    this.getChat.emit(chatUser);
  }

  liveUpdates() {
    this.userChatNotificationsChannel.newMessagesCounter$.subscribe((value) => {
      console.log(value);
      if (value.length > 0) {
        this.moveUserToTop.emit(value);
        this.unreadCount = value.length;
        this.userChatNotificationsChannel.resetMessageCounter();
      }
    });
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-chatlist-open', {});
  }
}
