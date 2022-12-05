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
import { NbDialogService } from '@commudle/theme';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { CommunityChannelChannel } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel.channel';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { NoWhitespaceValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { IUserMessage } from 'apps/shared-models/user_message.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import * as moment from 'moment';

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
  pageSize = 15;
  allPreviousMessagesLoaded = false;
  allLatestMessagesLoaded = false;
  loadingMessages = false;
  isLoadingPrev = false;
  isLoadingNext = false;
  showReplyForm = 0;
  allActions;
  channelRoles = {};
  EUserRoles = EUserRoles;
  communityChannel: ICommunityChannel;
  chatMessageForm;
  action = 'initial';
  oldestMessageId;
  latestMessageId;
  messageId;
  isInitial;
  highlight = true;
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private communityChannelChannel: CommunityChannelChannel,
    private authWatchService: LibAuthwatchService,
    private discussionsService: DiscussionsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private communityChannelsService: CommunityChannelsService,
    private nbDialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.chatMessageForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]],
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    this.communityChannelChannel.unsubscribe();
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.allPreviousMessagesLoaded = false;
    this.allLatestMessagesLoaded = false;
    this.messages = [];
    this.pageSize = 15;
    this.blocked = false;
    this.showReplyForm = 0;
    this.loadingMessages = false;
    this.isLoadingPrev = false;
    this.isLoadingNext = false;

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
      this.communityChannelManagerService.scrollToMessage$.subscribe((message) => {
        if (message) {
          this.scrollToMessage(message);
          this.communityChannelManagerService.setScrollToMessage(null);
        }
      }),
    );

    this.communityChannelChannel.subscribe(`${this.discussion.id}`);

    this.receiveData();
    this.allActions = this.communityChannelChannel.ACTIONS;

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.user_message_id) {
        this.action = 'around';
        this.messageId = params.user_message_id;
      } else {
        this.action = 'initial';
      }
    });
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

  loadMessages() {
    const element = this.messagesContainer.nativeElement;
    const scrollBottom = element.scrollHeight - element.clientHeight - element.scrollTop;

    if (element.scrollTop <= 200) {
      this.action = 'before';
      this.messageId = this.oldestMessageId;
      this.getDiscussionMessages();
    }

    if (scrollBottom <= 200) {
      this.action = 'after';
      this.messageId = this.latestMessageId;
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
    if ((!this.allPreviousMessagesLoaded || !this.allLatestMessagesLoaded) && !this.loadingMessages) {
      this.loadingMessages = true;
      switch (this.action) {
        case 'before': {
          this.isLoadingPrev = true;
          break;
        }
        case 'after': {
          this.isLoadingNext = true;
          break;
        }
      }
      const action = this.action;
      const messageId = this.messageId;
      this.communityChannelsService
        .getDiscussionMessagesForScroll(this.discussion.parent_id, this.pageSize, action, messageId)
        .subscribe((data) => {
          switch (action) {
            case 'initial': {
              this.isInitial = true;
              this.messages.unshift(...data.user_messages.reverse());
              if (this.messages.length) {
                this.oldestMessageId = this.messages[0].id;
                this.latestMessageId = this.messages[this.messages.length - 1].id;
              }
              this.loadingMessages = false;
              this.scrollToBottom(); //alert here
              break;
            }
            case 'before': {
              if (data.user_messages.length !== this.pageSize) {
                this.allPreviousMessagesLoaded = true;
              }
              this.messages.unshift(...data.user_messages.reverse());
              this.oldestMessageId = this.messages[0].id;
              this.loadingMessages = false;
              this.isLoadingPrev = false;
              break;
            }
            case 'after': {
              if (data.user_messages.length !== this.pageSize) {
                this.allLatestMessagesLoaded = true;
              }
              this.messages.push(...data.user_messages.reverse());
              this.latestMessageId = this.messages[this.messages.length - 1].id;
              this.loadingMessages = false;
              this.isLoadingNext = false;
              break;
            }
            case 'around': {
              this.isInitial = false;
              this.messages = data.user_messages.reverse();
              this.allPreviousMessagesLoaded = false;
              this.allLatestMessagesLoaded = false;
              this.loadingMessages = false;
              if (this.messages.length) {
                this.oldestMessageId = this.messages[0].id;
                this.latestMessageId = this.messages[this.messages.length - 1].id;
              }
              setTimeout(() => {
                if (this.highlight) {
                  this.highlightMessage(messageId, true);
                } else {
                  this.highlightMessage(messageId, false);
                  this.highlight = true;
                }
              }, 1);
              break;
            }
          }
        });
    }
  }

  // getDiscussionMessages() {
  //   if (!this.allMessagesLoaded && !this.loadingMessages) {
  //     this.loadingMessages = true;
  //     this.communityChannelsService
  //       .getDiscussionMessages(this.discussion.parent_id, this.nextPage, this.pageSize)
  //       .subscribe((data) => {
  //         if (data.user_messages.length !== this.pageSize) {
  //           this.allMessagesLoaded = true;
  //         }
  //         this.messages.unshift(...data.user_messages.reverse());
  //         this.loadingMessages = false;
  //         if (this.nextPage === 1) {
  //           this.scrollToBottom();
  //         }

  //         this.nextPage += 1;
  //       });
  //   }
  // }

  scrollToMessage(message: IUserMessage) {
    const idx = this.messages.findIndex((msg) => msg.id === message.id);
    //message goes out of view if the message on which we are jumping is either 1st or 2nd message of the current page
    if (idx === -1 || idx == 0 || idx == 1) {
      this.action = 'around';
      this.messageId = message.id;
      this.getDiscussionMessages();
    } else {
      this.highlightMessage(message.id, true);
    }
  }

  highlightMessage(messageId, highlight) {
    const messageElement = document.getElementById(messageId.toString());
    messageElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center',
    });

    if (highlight) {
      messageElement.classList.add('active');
      setTimeout(() => {
        messageElement.classList.remove('active');
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
              if (this.isInitial) {
                this.messages.push(data.user_message);
                this.latestMessageId = this.messages[this.messages.length - 1].id;
                this.scrollToBottom();
              } else {
                this.highlight = false;
                this.scrollToMessage(data.user_message);
              }
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
                const parentMessageIdx = this.findMessageIndex(data.parent_id);
                const childMessageIdx = this.findReplyIndex(parentMessageIdx, data.user_message.id);
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
              break;
            }
            case this.communityChannelChannel.ACTIONS.PIN: {
              this.communityChannelManagerService.setPinData(data);
              break;
            }
            case this.communityChannelChannel.ACTIONS.UNPIN: {
              this.communityChannelManagerService.setPinData(data);
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
