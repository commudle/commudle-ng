import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDiscussionFollower} from '../../../../../../../shared-models/discussion-follower.model';
import {ICurrentUser} from '../../../../../../../shared-models/current_user.model';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit {

  // Predefined constants
  chatsListHeight = 75;
  chatsListWidth = 300;

  @Input() showLiveStatus: boolean;
  @Input() currentUser: ICurrentUser;
  @Input() allPersonalChatUsers: IDiscussionFollower[];
  @Output() getChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();

  constructor() {
  }

  ngOnInit(): void {
  }

  // Toggle chats list height
  toggleChatsListHeight() {
    this.chatsListHeight = 75 - this.chatsListHeight;
  }

  openChat(chatUser) {
    this.getChat.emit(chatUser);
  }
}
