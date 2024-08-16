import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserChatNotificationsChannel } from 'apps/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-notifications.channel';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { DiscussionChatChannel } from 'apps/shared-components/services/websockets/discussion-chat.channel';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IDiscussionFollower } from 'apps/shared-models/discussion-follower.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import moment from 'moment';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit, OnChanges {
  @Input() currentUser: ICurrentUser;
  @Input() allPersonalChatUsers: IDiscussionFollower[];
  @Output() getChat: EventEmitter<IDiscussionFollower> = new EventEmitter<IDiscussionFollower>();
  @Output() moveUserToTop: EventEmitter<IDiscussionFollower[]> = new EventEmitter<IDiscussionFollower[]>();
  selectedChatUser: IDiscussionFollower;

  showLiveStatus = false;
  showChat = false;
  unreadCount = 0;
  moment = moment;

  constructor(
    private authWatchService: LibAuthwatchService,
    private userChatNotificationsChannel: UserChatNotificationsChannel,
    private gtm: GoogleTagManagerService,
    private discussionChatChannel: DiscussionChatChannel,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => (this.showLiveStatus = !!data));

    this.userChatNotificationsChannel.subscribe();

    // Live update for new messages
    this.liveUpdates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.currentUser) {
    //   this.allPersonalChatUsers.forEach((chatUser) => {
    //     this.discussionChatChannel.subscribe(chatUser.discussion_id);
    //   });
    //   setTimeout(() => {
    //     this.receiveData();
    //   }, 2000);
    // }
  }

  // receiveData() {
  //   this.allPersonalChatUsers.forEach((chatUser) => {
  //     console.log('1');
  //     // eslint-disable-next-line no-prototype-builtins
  //     if (this.discussionChatChannel.channelData$.hasOwnProperty(chatUser.discussion_id)) {
  //       console.log('2');
  //       this.discussionChatChannel.channelData$[chatUser.discussion_id].subscribe((data) => {
  //         console.log('3');
  //         if (data) {
  //           console.log(data, '4');
  //           switch (data.action) {
  //             case this.discussionChatChannel.ACTIONS.ADD: {
  //               const message = this.allPersonalChatUsers.find(
  //                 (userMessage) => userMessage.discussion_id === data.user_message.discussion_id,
  //               );
  //               console.log(message);
  //             }
  //           }
  //         }
  //       });
  //     }
  //   });
  // }

  openChat(chatUser) {
    this.selectedChatUser = chatUser;
    this.getChat.emit(chatUser);
  }

  liveUpdates() {
    this.userChatNotificationsChannel.newMessagesCounter$.subscribe((value) => {
      if (value.length > 0) {
        this.moveUserToTop.emit(value);
        this.unreadCount = value.length;
        this.userChatNotificationsChannel.resetMessageCounter();
      }
    });
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-chatlist-open', {});
  }
}
