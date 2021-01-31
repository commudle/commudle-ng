import {Component, OnDestroy, OnInit} from '@angular/core';
import {IDiscussionFollower} from '../../../../../../../shared-models/discussion-follower.model';
import {IDiscussion} from '../../../../../../../shared-models/discussion.model';
import {ICurrentUser} from '../../../../../../../shared-models/current_user.model';
import {SDiscussionsService} from '../../../../../../../shared-components/services/s-discussions.service';
import {UserPersonalDiscussionChatNotificationsChannel} from '../../../../../../../shared-services/websockets/user-personal-discussion-chat-notifications.channel';
import {LibAuthwatchService} from '../../../../../../../shared-services/lib-authwatch.service';

@Component({
  selector: 'app-chats-container',
  templateUrl: './chats-container.component.html',
  styleUrls: ['./chats-container.component.scss']
})
export class ChatsContainerComponent implements OnInit, OnDestroy {

  chatsListHeight = 75;
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
  ) {
  }

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

  toggleChatHeight() {
    this.chatsListHeight = 75 - this.chatsListHeight;
  }

  openChat($event) {
    this.getDiscussion($event);
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
          const index = this.allPersonalChatUsers.findIndex(k => k.id === value[0].id);
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
