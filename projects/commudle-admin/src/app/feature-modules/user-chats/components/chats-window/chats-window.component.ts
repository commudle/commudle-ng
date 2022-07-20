import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserChatMessagesChannel } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-messages.channel';
import { SDiscussionsService } from 'projects/shared-components/services/s-discussions.service';
import { DiscussionPersonalChatChannel } from 'projects/shared-components/services/websockets/dicussion-personal-chat.channel';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-chats-window',
  templateUrl: './chats-window.component.html',
  styleUrls: ['./chats-window.component.scss'],
})
export class ChatsWindowComponent implements OnInit {
  @Input() discussionFollower: IDiscussionFollower;
  @Output() removeFromUnread: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();
  @Output() removeChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();

  items = [{ title: 'Block' }];
  // Predefined constants
  chatsWindowHeight = 50;
  chatsWindowWidth = 350;
  blocked = false;

  discussion: IDiscussion;

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
    this.nbMenuService.onItemClick().subscribe(() => this.blockChat());
  }

  // Toggle chats window height
  toggleChatsWindowHeight() {
    if (window.innerWidth > 1000) {
      this.chatsWindowHeight = 50 - this.chatsWindowHeight;
    }
  }

  getDiscussion() {
    // also set the last read time and unread messages on the server side for this API
    this.sDiscussionService.getPersonalChat(this.discussionFollower.discussion_id).subscribe((data) => {
      this.discussion = data;
      this.userChatMessagesChannel.subscribe(this.discussion.id);
      this.removeFromUnread.emit(this.discussionFollower);
    });
  }

  closeChat() {
    this.removeChat.emit(this.discussionFollower);
  }

  blockChat() {
    this.discussionChatChannel.sendData(this.discussion.id, this.discussionChatChannel.ACTIONS.TOGGLE_BLOCK, {});
  }
}
