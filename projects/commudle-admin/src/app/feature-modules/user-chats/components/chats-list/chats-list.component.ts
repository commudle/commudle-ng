import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDiscussionFollower} from '../../../../../../../shared-models/discussion-follower.model';
import {ICurrentUser} from '../../../../../../../shared-models/current_user.model';
import {LibAuthwatchService} from '../../../../../../../shared-services/lib-authwatch.service';

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

  @Input() currentUser: ICurrentUser;
  @Input() allPersonalChatUsers: IDiscussionFollower[];
  @Output() getChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();

  constructor(
    private authWatchService: LibAuthwatchService,
  ) {
  }

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe(data => this.showLiveStatus = !!data);
  }

  // Toggle chats list height
  toggleChatsListHeight() {
    this.chatsListHeight = 75 - this.chatsListHeight;
  }

  openChat(chatUser) {
    this.getChat.emit(chatUser);
  }

  unreadCount(): number {
    let count = 0;
    for (const user of this.allPersonalChatUsers) {
      if (user.unread_user_ids.includes(this.currentUser.id)) {
        count++;
      }
    }
    return count;
  }
}
