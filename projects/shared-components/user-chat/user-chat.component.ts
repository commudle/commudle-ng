import { Component, OnInit, OnDestroy } from '@angular/core';
import { SDiscussionsService } from '../services/s-discussions.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';
import { UserNotificationsChannel } from 'projects/shared-services/websockets/user-notifications.channel';
import { kill } from 'process';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit, OnDestroy {

  discussionUserIds: number[];
  allPersonalChatUsers: IDiscussionFollower[] = [];
  selectedDiscussionFollower: IDiscussionFollower;
  discussion: IDiscussion;
  messageSub;

  constructor(
    private sDiscussionService: SDiscussionsService,
    private userNotificationsChannel: UserNotificationsChannel
  ) { }

  ngOnInit() {
    if (this.discussionUserIds) {
      this.findOrCreateDiscussion();
    } else {
      this.getDiscussionUsers();
    }

    this.userNotificationsChannel.resetMessageCounter();

  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
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
        if (this.selectedDiscussionFollower) {
          this.getDiscussion(this.selectedDiscussionFollower);
        }

        this.liveUpdates();
      }
    );
  }

  getDiscussion(discussionFollower) {
    this.discussion = null;
    this.selectedDiscussionFollower = discussionFollower;

    // also set the last read time and unread messages on the server side for this API
    this.sDiscussionService.getPersonalChat(this.selectedDiscussionFollower.discussion_id).subscribe(
      data => {
        this.allPersonalChatUsers.find(k => k.id === discussionFollower.id).unread = false;
        this.discussion = data;
      }
    );
  }

  liveUpdates() {
    this.messageSub = this.userNotificationsChannel.newMessagesCounter$.subscribe(
      value => {
        if (
            value.length > 0 &&
            (!this.selectedDiscussionFollower
            || (this.selectedDiscussionFollower && this.selectedDiscussionFollower.id !== value[0].id)
            )) {
          let index = this.allPersonalChatUsers.findIndex(k => k.id === value[0].id);
          if (index > -1) {
            this.allPersonalChatUsers[index].unread = true;
          } else {
            this.allPersonalChatUsers.unshift(value[0]);
          }
          this.userNotificationsChannel.resetMessageCounter();

        }
      }
    );
  }
}
