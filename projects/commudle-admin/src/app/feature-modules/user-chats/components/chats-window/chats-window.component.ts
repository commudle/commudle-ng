import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDiscussionFollower} from '../../../../../../../shared-models/discussion-follower.model';
import {IDiscussion} from '../../../../../../../shared-models/discussion.model';
import {SDiscussionsService} from '../../../../../../../shared-components/services/s-discussions.service';

@Component({
  selector: 'app-chats-window',
  templateUrl: './chats-window.component.html',
  styleUrls: ['./chats-window.component.scss']
})
export class ChatsWindowComponent implements OnInit {

  // Predefined constants
  chatsWindowHeight = 50;
  chatsWindowWidth = 350;

  discussion: IDiscussion;
  @Input() discussionFollower: IDiscussionFollower;
  @Output() removeFromUnread: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();
  @Output() removeChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();

  constructor(
    private sDiscussionService: SDiscussionsService,
  ) {
  }

  ngOnInit(): void {
    this.getDiscussion();
  }

  // Toggle chats window height
  toggleChatsWindowHeight() {
    this.chatsWindowHeight = 50 - this.chatsWindowHeight;
  }

  getDiscussion() {
    // also set the last read time and unread messages on the server side for this API
    this.sDiscussionService.getPersonalChat(this.discussionFollower.discussion_id).subscribe(
      data => {
        this.discussion = data;
        this.removeFromUnread.emit(this.discussionFollower);
      }
    );
  }

  closeChat() {
    this.removeChat.emit(this.discussionFollower);
  }
}
