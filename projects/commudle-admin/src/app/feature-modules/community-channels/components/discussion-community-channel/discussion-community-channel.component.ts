import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUser } from 'projects/shared-models/user.model';
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, OnChanges, TemplateRef} from '@angular/core';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import * as moment from 'moment';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { UserMessagesService } from 'projects/commudle-admin/src/app/services/user-messages.service';
import { CommunityChannelChannel } from '../../services/websockets/community-channel.channel';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { NbDialogService } from '@nebular/theme';
import { CommunityChannelsService } from '../../services/community-channels.service';


@Component({
  selector: 'app-discussion-community-channel',
  templateUrl: './discussion-community-channel.component.html',
  styleUrls: ['./discussion-community-channel.component.scss']
})
export class DiscussionCommunityChannelComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  @ViewChild('confirmJoinDialog') joinChannelDialog: TemplateRef<any>;
  @Input() discussion: IDiscussion;
  @Output() newMessage = new EventEmitter();


  moment = moment;

  currentUser: ICurrentUser;
  subscriptions = [];
  messages: IUserMessage[] = [];
  permittedActions = [];
  blocked = true;
  pageSize = 10;
  nextPage = 1;
  allMessagesLoaded = false;
  loadingMessages = false;
  showReplyForm = 0;
  allActions;
  channelRoles = {};
  EUserRoles = EUserRoles;

  chatMessageForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]]
  });


  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private userMessagesService: UserMessagesService,
    private communityChannelChannel: CommunityChannelChannel,
    private authWatchService: LibAuthwatchService,
    private discussionsService: DiscussionsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private nbDialogService: NbDialogService,
    private communityChannelService: CommunityChannelsService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.communityChannelChannel.unsubscribe();
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.allMessagesLoaded = false;
    this.messages = [];
    this.pageSize = 10;
    this.nextPage = 1;
    this.blocked = false;
    this.showReplyForm = 0;

    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(
      user => {
        this.currentUser = user;
      }
    ));

    this.communityChannelManagerService.allChannelRoles$.subscribe(
      data => {
        this.channelRoles = data;
      }
    )

    this.communityChannelChannel.subscribe(`${this.discussion.id}`);

    this.receiveData();
    this.allActions = this.communityChannelChannel.ACTIONS;
    this.getDiscussionMessages();

  }


  ngOnDestroy() {
    this.communityChannelChannel.unsubscribe();
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


  scrollToBottom() {
    // TODO find a fix to this settimeout for scrolling to bottom on every new message loaded
    setTimeout(() => {
      try {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight + 300;
      } catch (err) {
        console.log(err);
      }
    }, 100);

  }

  loadPreviousMessages() {
    if (this.messagesContainer.nativeElement.scrollTop <= 300) {
      this.getDiscussionMessages();
    }
  }

  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }

  openJoinChannelDialog() {
    this.nbDialogService.open(this.joinChannelDialog);
  }

  joinChannel() {
    this.communityChannelService.joinChannel(this.discussion.parent_id).subscribe((data) => {
      if(data) {
        this.toastLogService.successDialog("Welcome to the channel!");
        location.reload();
      }
    });
  }

  getDiscussionMessages() {
    if (!this.allMessagesLoaded && !this.loadingMessages) {
      this.loadingMessages = true;
      this.userMessagesService.pGetCommunityChannelDiscussionMessages(this.discussion.id, this.nextPage, this.pageSize).subscribe(
        data => {
          if (data.user_messages.length !== this.pageSize) {
            this.allMessagesLoaded = true;
          }
          this.messages.unshift(...data.user_messages.reverse());
          this.loadingMessages = false;
          if (this.nextPage === 1) {
            this.scrollToBottom();
          }

          this.nextPage += 1;

        }
      );
    }
  }


  toggleReplyForm(messageId) {
    this.showReplyForm === messageId ? (this.showReplyForm = 0) : (this.showReplyForm = messageId);
  }

  sendMessage(data) {
    this.communityChannelChannel.sendData(
      this.communityChannelChannel.ACTIONS.ADD,
      {
        user_message: data
      }
    );
    this.chatMessageForm.reset();
  }

  sendAttachmentMessage(data) {
    this.discussionsService.communityChannelNewAttachmentMessage(data, 'Discussion', this.discussion.id).subscribe();
  }



  // sendUpdatedMessage(data) {
  //   this.communityChannelChannel.sendData(
  //     this.communityChannelChannel.ACTIONS.UPDATE,
  //     {
  //       user_message: data
  //     }
  //   );
  //   this.chatMessageForm.reset();
  // }

  // sendUpdatedAttachmentMessage(data) {
  //   this.discussionsService.communityChannelUpdatedAttachmentMessage(data,).subscribe();
  // }


  sendVote(userMessageId) {
    this.communityChannelChannel.sendData(
      this.communityChannelChannel.ACTIONS.VOTE,
      {
        user_message_id: userMessageId
      }
    );
  }


  delete(userMessageId) {
    this.communityChannelChannel.sendData(
      this.communityChannelChannel.ACTIONS.DELETE,
      {
        user_message_id: userMessageId
      }
    );
  }

  sendReply(replyContent, userMessageId) {
    this.communityChannelChannel.sendData(
      this.communityChannelChannel.ACTIONS.REPLY,
      {
        user_message_id: userMessageId,
        reply_message: replyContent
      }
    );
  }

  sendAttachmentReply(replyContent, userMessageId) {
    this.discussionsService.communityChannelNewAttachmentMessage(replyContent, 'UserMessage', userMessageId).subscribe();

  }

  // TODO CHANNEL convert this to remove member
  blockChat() {
    this.communityChannelChannel.sendData(
      this.communityChannelChannel.ACTIONS.TOGGLE_BLOCK,
      {}
    );
  }


  receiveData() {
    this.subscriptions.push(
      this.communityChannelChannel.channelData$.subscribe(
        (data) => {
          if (data) {
            switch (data.action) {
              case(this.communityChannelChannel.ACTIONS.SET_PERMISSIONS): {
                this.permittedActions = data.permitted_actions;
                break;
              }
              case(this.communityChannelChannel.ACTIONS.ADD): {
                this.messages.push(data.user_message);
                this.scrollToBottom();
                this.newMessage.emit();
                break;
              }
              case(this.communityChannelChannel.ACTIONS.REPLY): {
                this.messages[this.findMessageIndex(data.parent_id)].user_messages.push(data.user_message);
                this.newMessage.emit();
                break;
              }
              case(this.communityChannelChannel.ACTIONS.UPDATE): {
                // if (data.parent_type === 'UserMessage') {
                //   let parentMessage = this.findMessageIndex(data.parent_id);
                //   let childMessage = this.findReplyIndex(parentMessage, data.id);
                //   this.messages[parentMessage].user_messages[childMessage] = data;
                // } else {
                //   this.messages[this.findMessageIndex(data.parent_id)] = data;
                // }
                // this.newMessage.emit();
                break;
              }
              case(this.communityChannelChannel.ACTIONS.DELETE): {
                if (data.parent_type === 'Discussion') {
                  this.messages.splice(this.findMessageIndex(data.user_message_id), 1);
                } else {
                  const qi = this.findMessageIndex(data.parent_id);
                  if (this.messages[qi]) {
                    this.messages[qi].user_messages.splice(this.findReplyIndex(qi, data.user_message_id), 1);
                  }
                }

                break;
              }
              case(this.communityChannelChannel.ACTIONS.FLAG): {
                if (data.parent_type === 'Discussion') {
                  this.messages[this.findMessageIndex(data.user_message_id)].flags_count += data.flag;
                } else {
                  const qi = this.findMessageIndex(data.parent_id);
                  this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].flags_count += data.flag;
                }
                break;
              }
              case(this.communityChannelChannel.ACTIONS.VOTE): {
                if (data.parent_type === 'Discussion') {
                  this.messages[this.findMessageIndex(data.user_message_id)].votes_count += data.vote;
                } else {
                  const qi = this.findMessageIndex(data.parent_id);
                  this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].votes_count += data.vote;
                }
                break;
              }
              case(this.communityChannelChannel.ACTIONS.ERROR): {
                this.toastLogService.warningDialog(data.message, 2000);
                break;
              }
            }
          }

        }
      )
    );
  }


  findMessageIndex(userMessageId) {
    return this.messages.findIndex(q => (q.id === userMessageId));
  }

  findReplyIndex(questionIndex, replyId) {
    return this.messages[questionIndex].user_messages.findIndex(q => (q.id === replyId));
  }




}
