import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserChatNotificationsChannel } from 'apps/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-notifications.channel';
import { ICurrentUser } from '@commudle/shared-models';
import { IDiscussionFollower } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit {
  @Input() currentUser: ICurrentUser;
  @Input() allPersonalChatUsers: IDiscussionFollower[];
  @Output() getChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();
  @Output() moveUserToTop: EventEmitter<IDiscussionFollower[]> = new EventEmitter<IDiscussionFollower[]>();

  showLiveStatus = false;
  showChat = false;
  unreadCount = 0;

  constructor(
    private authWatchService: LibAuthwatchService,
    private userChatNotificationsChannel: UserChatNotificationsChannel,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => (this.showLiveStatus = !!data));

    this.userChatNotificationsChannel.subscribe();

    // Live update for new messages
    this.liveUpdates();
  }

  openChat(chatUser) {
    this.getChat.emit(chatUser);
  }

  liveUpdates() {
    this.userChatNotificationsChannel.newMessagesCounter$.subscribe((value) => {
      if (value.length > 0) {
        this.moveUserToTop.emit(value);
        this.unreadCount = value.length;
        this.userChatNotificationsChannel.resetMessageCounter();
      }
    });
  }
}
