import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDiscussionFollower} from 'projects/shared-models/discussion-follower.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {UserChatNotificationsChannel} from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-notifications.channel';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit {

  // Predefined constants
  chatsListHeight = 0;
  chatsListWidth = 300;

  showLiveStatus = false;
  unreadCount = 0;

  @Input() currentUser: ICurrentUser;
  @Input() allPersonalChatUsers: IDiscussionFollower[];
  @Output() getChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();
  @Output() moveUserToTop: EventEmitter<IDiscussionFollower[]> = new EventEmitter<IDiscussionFollower[]>();

  constructor(
    private authWatchService: LibAuthwatchService,
    private userChatNotificationsChannel: UserChatNotificationsChannel
  ) {
  }

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe(data => this.showLiveStatus = !!data);

    this.userChatNotificationsChannel.subscribe();

    // Live update for new messages
    this.liveUpdates();
  }

  // Toggle chats list height
  toggleChatsListHeight() {
    this.chatsListHeight = 75 - this.chatsListHeight;
    this.unreadCount = 0;
  }

  openChat(chatUser) {
    this.getChat.emit(chatUser);
  }

  liveUpdates() {
    this.userChatNotificationsChannel.newMessagesCounter$.subscribe(value => {
      if (value.length > 0) {
        this.moveUserToTop.emit(value);

        this.unreadCount = value.length;
        this.userChatNotificationsChannel.resetMessageCounter();
      }
    });
  }
}
