import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {IDiscussionFollower} from '../../../../../../../shared-models/discussion-follower.model';
import {ICurrentUser} from '../../../../../../../shared-models/current_user.model';
import {SDiscussionsService} from '../../../../../../../shared-components/services/s-discussions.service';
import {UserPersonalDiscussionChatNotificationsChannel} from '../../../../../../../shared-services/websockets/user-personal-discussion-chat-notifications.channel';
import {LibAuthwatchService} from '../../../../../../../shared-services/lib-authwatch.service';
import {UserChatsService} from '../../services/user-chats.service';

@Component({
  selector: 'app-chats-container',
  templateUrl: './chats-container.component.html',
  styleUrls: ['./chats-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChatsContainerComponent implements OnInit, OnDestroy {

  // Number of allowed chat windows
  numChatWindows: number;

  // All the persons we can chat with
  allPersonalChatUsers: IDiscussionFollower[] = [];
  // The persons with whom we are chatting with
  discussionFollowers: IDiscussionFollower[] = [];
  // The current user
  currentUser: ICurrentUser;
  showLiveStatus = false;
  currentUserSubscription;

  uuid = uuidv4();

  constructor(
    private sDiscussionService: SDiscussionsService,
    private userNotificationsChannel: UserPersonalDiscussionChatNotificationsChannel,
    private authWatchService: LibAuthwatchService,
    private userChatsService: UserChatsService
  ) {
  }

  ngOnInit() {
    // Get current user data
    this.currentUserSubscription = this.authWatchService.currentUser$.subscribe(data => {
      this.currentUser = data;
      if (data) {
        this.showLiveStatus = true;
      }
    });

    // Get the current user's chats
    this.sDiscussionService.getPersonalChats().subscribe(data => this.allPersonalChatUsers = data.discussion_followers);

    // TODO: Make this better
    // Calculate screen width to find the number of chat windows that are allowed simultaneously
    this.numChatWindows = Math.floor((window.innerWidth - 300) / 355);

    // If clicked on messaging button in any user
    this.userChatsService.followerIdChange$.subscribe(data => this.createChat(data));
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  createChat(followerId: number) {
    this.sDiscussionService.getOrCreatePersonalChat([followerId]).subscribe(data => this.openChat(data));
  }

  // Open a chat based on the user clicked (event emitter from chats list component)
  openChat(follower: IDiscussionFollower) {
    // Add only if follower is not active
    // Duplicates are added if done by .includes, hence this elaborate way of checking IDiscussionFollower id's
    let isThere = false;
    this.discussionFollowers.forEach(value => {
      if (value.id === follower.id) {
        isThere = true;
      }
    });
    if (!isThere) {
      // Check if length exceeds the maximum allowed windows
      if (this.discussionFollowers.length >= this.numChatWindows) {
        // Unsubscribe the removed user
        this.userNotificationsChannel.unsubscribe(this.currentUser.id, follower.discussion_id, this.uuid);
        // Remove from the starting of the array
        this.discussionFollowers.shift();
      }
      // Insert into the back of the array
      this.discussionFollowers.push(follower);
    }
  }

  closeChat(follower: IDiscussionFollower) {
    const index = this.discussionFollowers.indexOf(follower);
    this.userNotificationsChannel.unsubscribe(this.currentUser.id, follower.discussion_id, this.uuid);
    this.discussionFollowers.splice(index, 1);
  }

  // If there has been a new message and the user has seen it, remove the unread badge
  removeFromUnread(follower: IDiscussionFollower) {
    const index = this.discussionFollowers.indexOf(follower);
    const unreadIndex = this.allPersonalChatUsers[index].unread_user_ids.findIndex(k => k === this.currentUser.id);
    this.allPersonalChatUsers[index].unread_user_ids.splice(unreadIndex, 1);
  }
}
