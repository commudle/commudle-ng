import { Component, OnInit, OnDestroy } from '@angular/core';
import { SDiscussionsService } from '../services/s-discussions.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';
import { UserPersonalDiscussionChatNotificationsChannel } from 'projects/shared-services/websockets/user-personal-discussion-chat-notifications.channel';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';

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
  currentUser: ICurrentUser;
  currentUserSubscription;
  messageSub;

  constructor(
    private sDiscussionService: SDiscussionsService,
    private userNotificationsChannel: UserPersonalDiscussionChatNotificationsChannel,
    private authWatchService: LibAuthwatchService
  ) { }

  ngOnInit() {

    this.currentUserSubscription = this.authWatchService.currentUser$.subscribe(
      data => this.currentUser = data
    );
    if (this.discussionUserIds) {
      this.findOrCreateDiscussion();
    } else {
      this.getDiscussionUsers();
    }

    this.userNotificationsChannel.resetMessageCounter();

  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
    this.currentUserSubscription.unsubscribe();
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
          this.getDiscussion(
            [this.selectedDiscussionFollower, this.allPersonalChatUsers.findIndex(k => k.id === this.selectedDiscussionFollower.id)]
            );
        }

        this.liveUpdates();
      }
    );
  }

  getDiscussion(discussionFollowerValues) {
    const discussionFollower = discussionFollowerValues[0];
    const index = discussionFollowerValues[1];
    this.discussion = null;
    this.selectedDiscussionFollower = discussionFollower;

    // also set the last read time and unread messages on the server side for this API
    this.sDiscussionService.getPersonalChat(this.selectedDiscussionFollower.discussion_id).subscribe(
      data => {
        const unreadIndex = this.allPersonalChatUsers[index].unread_user_ids.findIndex(k => k === this.currentUser.id);
        this.allPersonalChatUsers[index].unread_user_ids.splice(unreadIndex, 1);
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

            this.allPersonalChatUsers.splice(index, 1);
          }
          this.allPersonalChatUsers.unshift(value[0]);

          this.userNotificationsChannel.resetMessageCounter();

        }
      }
    );
  }
}
