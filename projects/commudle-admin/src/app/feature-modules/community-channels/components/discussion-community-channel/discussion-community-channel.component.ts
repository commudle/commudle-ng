import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { CommunityChannelManagerService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelsService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { CommunityChannelChannel } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel.channel';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-discussion-community-channel',
  templateUrl: './discussion-community-channel.component.html',
  styleUrls: ['./discussion-community-channel.component.scss'],
})
export class DiscussionCommunityChannelComponent implements OnInit, OnChanges, OnDestroy {
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
  communityChannel: ICommunityChannel;
  chatMessageForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]],
  });
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  highlightMessage;
  highlightMessageId;

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private communityChannelChannel: CommunityChannelChannel,
    private authWatchService: LibAuthwatchService,
    private discussionsService: DiscussionsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private communityChannelsService: CommunityChannelsService,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.scrollToMessage$.subscribe((message) => {
        if (message) {
          this.scrollToMessage(message);
        }
      }),
    );
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

    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((user) => {
        this.currentUser = user;
      }),
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelRoles = data;
      }),
      this.communityChannelManagerService.selectedChannel$.subscribe((data) => {
        this.communityChannel = data;
      }),
    );

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
    this.communityChannelsService.joinChannel(this.discussion.parent_id).subscribe((data) => {
      if (data) {
        this.toastLogService.successDialog('Welcome to the channel!');
        location.reload();
      }
    });
  }

  getDiscussionMessages() {
    if (!this.allMessagesLoaded && !this.loadingMessages) {
      this.loadingMessages = true;
      this.communityChannelsService
        .getDiscussionMessages(this.discussion.parent_id, this.nextPage, this.pageSize)
        .subscribe((data) => {
          if (data.user_messages.length !== this.pageSize) {
            this.allMessagesLoaded = true;
          }
          this.messages.unshift(...data.user_messages.reverse());
          this.loadingMessages = false;
          if (this.nextPage === 1) {
            this.scrollToBottom();
          }

          this.nextPage += 1;
        });
    }
  }

  scrollToMessage(message: IUserMessage) {
    const idx = this.messages.findIndex((msg) => msg.id === message.id);
    if (idx === -1) {
      this.communityChannelsService
        .getDiscussionMessagesForScroll(this.discussion.parent_id, message.id, this.nextPage, this.pageSize)
        .subscribe((response) => {
          console.log(response.user_messages);
          this.messages = response.user_messages.reverse();
          let messageElement = document.getElementById(message.id.toString());
          messageElement.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center',
          });
          this.highlightMessageId = message.id;
          this.highlightMessage = true;
          setTimeout(() => {
            this.highlightMessage = false;
          }, 1000);
        });
    } else {
      let messageElement = document.getElementById(message.id.toString());
      messageElement.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
      this.highlightMessageId = message.id;
      this.highlightMessage = true;
      setTimeout(() => {
        this.highlightMessage = false;
      }, 1000);
    }
  }

  sendMessageByEmail(userMessageId) {
    if (window.confirm(`Are you sure you want to send this to all members on their email?`)) {
      this.communityChannelsService.sendMessageByEmail(userMessageId, this.discussion.parent_id).subscribe((data) => {
        if (data) {
          this.toastLogService.successDialog('Emails are being delivered', 1500);
        }
      });
    }
  }

  toggleReplyForm(messageId) {
    this.showReplyForm === messageId ? (this.showReplyForm = 0) : (this.showReplyForm = messageId);
  }

  sendMessage(data) {
    this.communityChannelChannel.sendData(this.communityChannelChannel.ACTIONS.ADD, {
      user_message: data,
    });
    this.chatMessageForm.reset();
  }

  sendAttachmentMessage(data) {
    this.discussionsService.communityChannelNewAttachmentMessage(data, 'Discussion', this.discussion.id).subscribe();
  }

  sendUpdatedMessage(data, userMessageId) {
    if (data instanceof Array) {
      userMessageId = data[1];
      data = data[0];
    }
    this.communityChannelChannel.sendData(this.communityChannelChannel.ACTIONS.UPDATE, {
      user_message: data,
      user_message_id: userMessageId,
    });
    this.chatMessageForm.reset();
  }

  sendUpdatedAttachmentMessage(data, userMessageId) {
    if (data instanceof Array) {
      userMessageId = data[1];
      data = data[0];
    }

    let message: IUserMessage = this.messages.find((message: IUserMessage) => message.id === userMessageId);
    if (message === undefined) {
      const userMessage: IUserMessage = this.messages.find((message: IUserMessage) =>
        message.user_messages.find((msg: IUserMessage) => msg.id === userMessageId),
      );
      if (userMessage === undefined) {
        return;
      }
      message = userMessage.user_messages.find((message: IUserMessage) => message.id === userMessageId);
    }

    data.append('user_message_id', message.id);
    data.append('parent_type', message.parent_type);
    data.append('parent_id', message.parent_id);
    this.discussionsService.communityChannelUpdateAttachmentMessage(data, userMessageId).subscribe();
  }

  delete(userMessageId) {
    if (window.confirm(`Are you sure you want to delete this message and all the replies? This CANNOT BE UNDONE.`)) {
      this.communityChannelChannel.sendData(this.communityChannelChannel.ACTIONS.DELETE, {
        user_message_id: userMessageId,
      });
    }
  }

  sendReply(replyContent, userMessageId) {
    this.communityChannelChannel.sendData(this.communityChannelChannel.ACTIONS.REPLY, {
      user_message_id: userMessageId,
      reply_message: replyContent,
    });
  }

  sendAttachmentReply(replyContent, userMessageId) {
    this.discussionsService
      .communityChannelNewAttachmentMessage(replyContent, 'UserMessage', userMessageId)
      .subscribe();
  }

  // TODO CHANNEL convert this to remove member
  blockChat() {
    this.communityChannelChannel.sendData(this.communityChannelChannel.ACTIONS.TOGGLE_BLOCK, {});
  }

  markMessageRead(userMessageId) {
    this.communityChannelChannel.sendData(this.communityChannelChannel.ACTIONS.READ_MESSAGE, {
      user_message_id: userMessageId,
    });
  }

  receiveData() {
    this.subscriptions.push(
      this.communityChannelChannel.channelData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.communityChannelChannel.ACTIONS.SET_PERMISSIONS: {
              this.permittedActions = data.permitted_actions;
              this.communityChannelManagerService.setUserPermissions(this.permittedActions);
              break;
            }
            case this.communityChannelChannel.ACTIONS.ADD: {
              this.messages.push(data.user_message);
              this.scrollToBottom();
              this.newMessage.emit();
              break;
            }
            case this.communityChannelChannel.ACTIONS.REPLY: {
              this.messages[this.findMessageIndex(data.parent_id)].user_messages.push(data.user_message);
              this.newMessage.emit();
              break;
            }
            case this.communityChannelChannel.ACTIONS.UPDATE: {
              if (data.parent_type === 'UserMessage') {
                let parentMessageIdx = this.findMessageIndex(data.parent_id);
                let childMessageIdx = this.findReplyIndex(parentMessageIdx, data.user_message.id);
                this.messages[parentMessageIdx].user_messages[childMessageIdx] = data.user_message;
              } else {
                this.messages[this.findMessageIndex(data.user_message.id)] = data.user_message;
              }
              this.newMessage.emit();
              break;
            }
            case this.communityChannelChannel.ACTIONS.DELETE: {
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
            case this.communityChannelChannel.ACTIONS.FLAG: {
              if (data.parent_type === 'Discussion') {
                this.messages[this.findMessageIndex(data.user_message_id)].flags_count += data.flag;
              } else {
                const qi = this.findMessageIndex(data.parent_id);
                this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].flags_count += data.flag;
              }
              break;
            }
            case this.communityChannelChannel.ACTIONS.ERROR: {
              this.toastLogService.warningDialog(data.message, 2000);
              break;
            }
            case this.communityChannelChannel.ACTIONS.CHANGE_PERMISSION: {
              if (this.currentUser && Number(data.user_id) === this.currentUser.id) {
                window.location.reload();
              }
            }
            case this.communityChannelChannel.ACTIONS.PIN: {
              this.communityChannelManagerService.setShowPinnedMessage(data);
              break;
            }
            case this.communityChannelChannel.ACTIONS.UNPIN: {
              this.communityChannelManagerService.setShowPinnedMessage(data);
              break;
            }
          }
        }
      }),
    );
  }

  findMessageIndex(userMessageId) {
    return this.messages.findIndex((q) => q.id === userMessageId);
  }

  findReplyIndex(questionIndex, replyId) {
    return this.messages[questionIndex].user_messages.findIndex((q) => q.id === replyId);
  }
}
