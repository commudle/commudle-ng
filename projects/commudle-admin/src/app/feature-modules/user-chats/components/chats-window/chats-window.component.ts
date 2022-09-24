import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserChatMessagesChannel } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-messages.channel';
import { SDiscussionsService } from 'projects/shared-components/services/s-discussions.service';
import { DiscussionPersonalChatChannel } from 'projects/shared-components/services/websockets/discussion-personal-chat.channel';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { NbMenuService } from '@nebular/theme';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-chats-window',
  templateUrl: './chats-window.component.html',
  styleUrls: ['./chats-window.component.scss'],
})
export class ChatsWindowComponent implements OnInit, OnDestroy {
  @Input() discussionFollower: IDiscussionFollower;
  @Output() removeFromUnread: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();
  @Output() removeChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();

  // Predefined constants
  chatsWindowHeight = 50;
  chatsWindowWidth = 350;

  discussionChannelSubscribed = false;

  channelSubscription;

  discussion: IDiscussion;

  subscriptions: Subscription[] = [];

  items = [
    {
      title: 'Block',
    },
  ];

  blocked = false;

  constructor(
    private sDiscussionService: SDiscussionsService,
    private userChatMessagesChannel: UserChatMessagesChannel,
    private discussionChatChannel: DiscussionPersonalChatChannel,
    private nbMenuService: NbMenuService,
  ) {}

  ngOnInit(): void {
    this.getDiscussion();

    //if the field 'minimized' exsists and is true the chat box will open minimized
    if (this.discussionFollower['minimized']) {
      this.toggleChatsWindowHeight();
    }
    //nb service used for nbMenu
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-personal-chat-menu-' + this.discussionFollower.discussion_id),
        map(({ item: { title } }) => title),
      )
      .subscribe((title) => {
        if (title === 'Block') {
          this.blocked = true;
        } else if (title === 'Unblock') {
          this.blocked = false;
        }
        this.discussionChatChannel.setDiscussionBlockedStatuses(this.discussionFollower.discussion_id, this.blocked);
      });
  }

  getMenuBlockedTitle() {
    this.discussionChatChannel.discussionBlockedStatuses$[this.discussionFollower.discussion_id].subscribe(
      (data: boolean) => {
        if (this.blocked !== data) {
          this.blocked = data;
        }
        this.setMenuBlockedTitle();
      },
    );
  }

  setMenuBlockedTitle() {
    if (this.blocked === true) {
      this.items = [{ title: 'Unblock' }];
    } else {
      this.items = [{ title: 'Block' }];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  // Toggle chats window height
  toggleChatsWindowHeight() {
    if (window.innerWidth > 1000) {
      this.chatsWindowHeight = 50 - this.chatsWindowHeight;
    }
  }

  getDiscussion() {
    // also set the last read time and unread messages on the server side for this API
    this.subscriptions.push(
      this.sDiscussionService.getPersonalChat(this.discussionFollower.discussion_id).subscribe((data) => {
        this.discussion = data;
        this.userChatMessagesChannel.subscribe(this.discussion.id);
        this.removeFromUnread.emit(this.discussionFollower);
      }),
    );
  }

  closeChat() {
    this.removeChat.emit(this.discussionFollower);
  }
}
