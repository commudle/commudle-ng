import { Component, OnInit } from '@angular/core';
import { SDiscussionsService } from '../services/s-discussions.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {

  discussionUserIds: number[];
  allPersonalChatUsers: IDiscussionFollower[];
  selectedDiscussionFollower: IDiscussionFollower;
  discussion: IDiscussion;

  constructor(
    private sDiscussionService: SDiscussionsService
  ) { }

  ngOnInit() {
    if (this.discussionUserIds) {
      this.findOrCreateDiscussion();
    } else {
      this.getDiscussionUsers();
    }

  }

  findOrCreateDiscussion() {
    this.sDiscussionService.getOrCreatePersonalChat(this.discussionUserIds).subscribe(
      data => {
        this.selectedDiscussionFollower = data;
        this.getDiscussionUsers();
      }
    );
  }

  getDiscussionUsers() {
    this.sDiscussionService.getPersonalChats().subscribe(
      data => {
        this.allPersonalChatUsers = data.discussion_followers;
      }
    );
  }

  getDiscussion(discussionFollower) {
    this.discussion = null;
    this.selectedDiscussionFollower = discussionFollower;

    // also set the last read time and unread messages on the server side for this API
    this.sDiscussionService.getPersonalChat(this.selectedDiscussionFollower.discussion_id).subscribe(
      data => {
        this.discussion = data;
      }
    );
  }
}
