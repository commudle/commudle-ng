import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { UserMessagesService } from 'apps/commudle-admin/src/app/services/user-messages.service';
import { NoWhitespaceValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserMessage } from 'apps/shared-models/user_message.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import * as moment from 'moment';
import { DiscussionPersonalChatChannel } from '../services/websockets/discussion-personal-chat.channel';
import { IEditorValidator } from '@commudle/editor';

@Component({
  selector: 'app-discussion-personal-chat',
  templateUrl: './discussion-personal-chat.component.html',
  styleUrls: ['./discussion-personal-chat.component.scss'],
})
export class DiscussionPersonalChatComponent implements OnInit, OnDestroy {
  @Input() discussion: IDiscussion;
  @Input() user: IUser;
  @Output() newMessage = new EventEmitter();
  @Output() discussionSubscribed = new EventEmitter();
  moment = moment;
  currentUser: ICurrentUser;
  currentUserSubscription;
  channelSubscription;
  messages: IUserMessage[] = [];
  permittedActions = [];
  pageSize = 10;
  nextPage = 1;
  allMessagesLoaded = false;
  loadingMessages = false;
  blocked: boolean;
  showReplyForm = 0;
  allActions;
  chatChannelSubscription;
  chatMessageForm;
  showEmojiForm = false;
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  validators: IEditorValidator = {
    required: true,
    minLength: 1,
    maxLength: 500,
    noWhitespace: true,
  };

  groupedMessages: { date: string; messages: IUserMessage[] }[] = [];

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private userMessagesService: UserMessagesService,
    private discussionChatChannel: DiscussionPersonalChatChannel,
    private authWatchService: LibAuthwatchService,
    private gtm: GoogleTagManagerService,
  ) {
    this.chatMessageForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]],
    });
  }

  ngOnInit() {
    this.currentUserSubscription = this.authWatchService.currentUser$.subscribe((user) => (this.currentUser = user));
    this.chatChannelSubscription = this.discussionChatChannel.subscribe(this.discussion.id);
    this.discussionSubscribed.emit(true);
    this.discussionChatChannel.discussionBlockedStatuses$[this.discussion.id].subscribe((data: boolean) => {
      let previousBlockedStatus = this.blocked;
      this.blocked = data;
      if (previousBlockedStatus !== data && data !== null && previousBlockedStatus !== null) {
        this.blockChat();
      }
    });
    this.receiveData();
    this.allActions = this.discussionChatChannel.ACTIONS;
    this.getDiscussionMessages();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
    this.chatChannelSubscription.unsubscribe(this.discussion.id);
    this.channelSubscription.unsubscribe(this.discussion.id);
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

  getDiscussionMessages() {
    if (!this.allMessagesLoaded && !this.loadingMessages) {
      this.loadingMessages = true;
      this.userMessagesService
        .getPersonalChatDiscussionMessages(this.discussion.id, this.nextPage, this.pageSize)
        .subscribe((data) => {
          if (data.user_messages.length !== this.pageSize) {
            this.allMessagesLoaded = true;
          }
          this.messages.unshift(...data.user_messages.reverse());
          this.groupedMessages = this.groupMessagesByDate(this.messages);
          this.loadingMessages = false;
          if (this.nextPage === 1) {
            this.scrollToBottom();
          }

          this.nextPage += 1;
        });
    }
  }

  groupMessagesByDate(messages) {
    const groupedMessages = {};
    messages.forEach((message) => {
      const date = new Date(message.created_at).toISOString().split('T')[0];
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(message);
    });

    return Object.keys(groupedMessages).map((date) => ({
      date,
      messages: groupedMessages[date],
    }));
  }

  toggleReplyForm(messageId) {
    this.showReplyForm = this.showReplyForm === messageId ? 0 : messageId;
  }

  sendMessage(content) {
    this.discussionChatChannel.sendData(this.discussion.id, this.discussionChatChannel.ACTIONS.ADD, {
      user_message: {
        content,
      },
    });
    this.chatMessageForm.reset();
    this.gtmService();
  }

  sendVote(userMessageId) {
    this.discussionChatChannel.sendData(this.discussion.id, this.discussionChatChannel.ACTIONS.VOTE, {
      user_message_id: userMessageId,
    });
  }

  sendFlag(userMessageId) {
    this.discussionChatChannel.sendData(this.discussion.id, this.discussionChatChannel.ACTIONS.FLAG, {
      user_message_id: userMessageId,
    });
  }

  delete(data) {
    let userMessageId = data.messageId;
    this.discussionChatChannel.sendData(this.discussion.id, this.discussionChatChannel.ACTIONS.DELETE, {
      user_message_id: userMessageId,
    });
  }

  sendReply(replyContent, userMessageId) {
    this.discussionChatChannel.sendData(this.discussion.id, this.discussionChatChannel.ACTIONS.REPLY, {
      user_message_id: userMessageId,
      reply_message: replyContent,
    });
  }

  blockChat() {
    this.discussionChatChannel.sendData(this.discussion.id, this.discussionChatChannel.ACTIONS.TOGGLE_BLOCK, {});
  }

  receiveData() {
    this.channelSubscription = this.discussionChatChannel.channelData$[this.discussion.id].subscribe((data) => {
      if (data) {
        switch (data.action) {
          case this.discussionChatChannel.ACTIONS.SET_PERMISSIONS: {
            this.permittedActions = data.permitted_actions;
            this.discussionChatChannel.setDiscussionBlockedStatuses(this.discussion.id, data.blocked);
            break;
          }
          case this.discussionChatChannel.ACTIONS.ADD: {
            const newMessageObj = {
              date: new Date(data.user_message.created_at).toISOString().split('T')[0],
              messages: [data.user_message],
            };
            const existingDateIndex = this.groupedMessages.findIndex((item) => item.date === newMessageObj.date);

            if (existingDateIndex !== -1) {
              this.groupedMessages[existingDateIndex].messages.push(data.user_message);
            } else {
              this.groupedMessages.push(newMessageObj);
            }

            this.scrollToBottom();
            this.newMessage.emit();
            break;
          }
          case this.discussionChatChannel.ACTIONS.REPLY: {
            const parentId = data.parent_id;
            const reply = data.user_message;
            const parentIndex = this.groupedMessages.findIndex((item) =>
              item.messages.some((message) => message.id === parentId),
            );

            if (parentIndex !== -1) {
              const parentMessage = this.groupedMessages[parentIndex].messages.find(
                (message) => message.id === parentId,
              );
              if (!parentMessage.user_messages) {
                parentMessage.user_messages = [];
              }
              parentMessage.user_messages.push(reply);
            }

            this.newMessage.emit();
            break;
          }
          case this.discussionChatChannel.ACTIONS.DELETE: {
            if (data.parent_type === 'Discussion') {
              const messageIndex = this.groupedMessages.findIndex((item) =>
                item.messages.some((message) => message.id === data.user_message_id),
              );
              if (messageIndex !== -1) {
                const message = this.groupedMessages[messageIndex].messages.find(
                  (message) => message.id === data.user_message_id,
                );
                const messageIndexInDate = this.groupedMessages[messageIndex].messages.indexOf(message);
                this.groupedMessages[messageIndex].messages.splice(messageIndexInDate, 1);

                if (this.groupedMessages[messageIndex].messages.length === 0) {
                  this.groupedMessages.splice(messageIndex, 1);
                }
              }
            } else {
              const parentIndex = this.groupedMessages.findIndex((item) =>
                item.messages.some((message) => message.id === data.parent_id),
              );
              if (parentIndex !== -1) {
                const parentMessage = this.groupedMessages[parentIndex].messages.find(
                  (message) => message.id === data.parent_id,
                );
                if (parentMessage.user_messages) {
                  const replyIndex = parentMessage.user_messages.findIndex(
                    (reply) => reply.id === data.user_message_id,
                  );
                  if (replyIndex !== -1) {
                    parentMessage.user_messages.splice(replyIndex, 1);
                  }
                }
              }
            }
            break;
          }
          case this.discussionChatChannel.ACTIONS.FLAG: {
            if (data.parent_type === 'Discussion') {
              const messageIndex = this.groupedMessages.findIndex((item) =>
                item.messages.some((message) => message.id === data.user_message_id),
              );
              if (messageIndex !== -1) {
                const message = this.groupedMessages[messageIndex].messages.find(
                  (message) => message.id === data.user_message_id,
                );
                message.flags_count += data.flag;
              }
            } else {
              const parentIndex = this.groupedMessages.findIndex((item) =>
                item.messages.some((message) => message.id === data.parent_id),
              );
              if (parentIndex !== -1) {
                const parentMessage = this.groupedMessages[parentIndex].messages.find(
                  (message) => message.id === data.parent_id,
                );
                if (parentMessage.user_messages) {
                  const replyIndex = parentMessage.user_messages.findIndex(
                    (reply) => reply.id === data.user_message_id,
                  );
                  if (replyIndex !== -1) {
                    parentMessage.user_messages[replyIndex].flags_count += data.flag;
                  }
                }
              }
            }
            break;
          }
          case this.discussionChatChannel.ACTIONS.VOTE: {
            if (data.parent_type === 'Discussion') {
              const messageIndex = this.groupedMessages.findIndex((item) =>
                item.messages.some((message) => message.id === data.user_message_id),
              );
              if (messageIndex !== -1) {
                const message = this.groupedMessages[messageIndex].messages.find(
                  (message) => message.id === data.user_message_id,
                );
                message.votes_count += data.vote;
              }
            } else {
              const parentIndex = this.groupedMessages.findIndex((item) =>
                item.messages.some((message) => message.id === data.parent_id),
              );
              if (parentIndex !== -1) {
                const parentMessage = this.groupedMessages[parentIndex].messages.find(
                  (message) => message.id === data.parent_id,
                );
                if (parentMessage.user_messages) {
                  const replyIndex = parentMessage.user_messages.findIndex(
                    (reply) => reply.id === data.user_message_id,
                  );
                  if (replyIndex !== -1) {
                    parentMessage.user_messages[replyIndex].votes_count += data.vote;
                  }
                }
              }
            }
            break;
          }
          case this.discussionChatChannel.ACTIONS.TOGGLE_BLOCK: {
            if (data.blocked) {
              this.toastLogService.warningDialog('You can only see and not send any messages.', 5000);
            }
            break;
          }
          case this.discussionChatChannel.ACTIONS.ERROR: {
            this.toastLogService.warningDialog(data.message, 2000);
            break;
          }
        }
      }
    });
  }

  findMessageIndex(userMessageId) {
    return this.messages.findIndex((q) => q.id === userMessageId);
  }

  findReplyIndex(questionIndex, replyId) {
    return this.messages[questionIndex].user_messages.findIndex((q) => q.id === replyId);
  }

  toggleEmojiForm() {
    this.showEmojiForm = !this.showEmojiForm;
  }

  selectEmoji(event) {
    let currentValue = this.chatMessageForm.get('content').value || '';
    this.chatMessageForm.patchValue({
      content: currentValue.concat(event.emoji.native),
    });
    this.inputElement?.nativeElement.focus();
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('send-chat-message', {
      com_user_id: this.currentUser.id,
      com_to_user_id: this.user.id,
    });
  }
}
