import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICurrentUser, IDiscussion, IUserMessage } from '@commudle/shared-models';
import {
  DiscussionPersonalChatChannel,
  LibAuthwatchService,
  LibToastLogService,
  UserMessagesService,
} from '@commudle/shared-services';
import { NoWhitespaceValidator } from '@commudle/shared-validators';
import * as moment from 'moment';

@Component({
  selector: 'commudle-discussion-personal-chat',
  templateUrl: './discussion-personal-chat.component.html',
  styleUrls: ['./discussion-personal-chat.component.scss'],
})
export class DiscussionPersonalChatComponent implements OnInit, OnDestroy {
  @Input() discussion: IDiscussion;
  @Output() newMessage = new EventEmitter();
  moment = moment;
  currentUser: ICurrentUser;
  currentUserSubscription;
  channelSubscription;
  messages: IUserMessage[] = [];
  permittedActions = [];
  blocked = false;
  pageSize = 10;
  nextPage = 1;
  allMessagesLoaded = false;
  loadingMessages = false;
  showReplyForm = 0;
  allActions;
  chatChannelSubscription;
  chatMessageForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]],
  });
  showEmojiForm = false;
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private userMessagesService: UserMessagesService,
    private discussionChatChannel: DiscussionPersonalChatChannel,
    private authWatchService: LibAuthwatchService,
  ) {}

  ngOnInit() {
    this.currentUserSubscription = this.authWatchService.currentUser$.subscribe((user) => (this.currentUser = user));
    this.chatChannelSubscription = this.discussionChatChannel.subscribe(this.discussion.id);
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
          this.loadingMessages = false;
          if (this.nextPage === 1) {
            this.scrollToBottom();
          }

          this.nextPage += 1;
        });
    }
  }

  toggleReplyForm(messageId) {
    this.showReplyForm = this.showReplyForm === messageId ? 0 : messageId;
  }

  sendMessage() {
    this.discussionChatChannel.sendData(this.discussion.id, this.discussionChatChannel.ACTIONS.ADD, {
      user_message: {
        content: this.chatMessageForm.get('content').value,
      },
    });
    this.chatMessageForm.reset();
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

  delete(userMessageId) {
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
            this.blocked = data.blocked;
            break;
          }
          case this.discussionChatChannel.ACTIONS.ADD: {
            this.messages.push(data.user_message);
            this.scrollToBottom();
            this.newMessage.emit();
            break;
          }
          case this.discussionChatChannel.ACTIONS.REPLY: {
            this.messages[this.findMessageIndex(data.parent_id)].user_messages.push(data.user_message);
            this.newMessage.emit();
            break;
          }
          case this.discussionChatChannel.ACTIONS.DELETE: {
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
          case this.discussionChatChannel.ACTIONS.FLAG: {
            if (data.parent_type === 'Discussion') {
              this.messages[this.findMessageIndex(data.user_message_id)].flags_count += data.flag;
            } else {
              const qi = this.findMessageIndex(data.parent_id);
              this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].flags_count += data.flag;
            }
            break;
          }
          case this.discussionChatChannel.ACTIONS.VOTE: {
            if (data.parent_type === 'Discussion') {
              this.messages[this.findMessageIndex(data.user_message_id)].votes_count += data.vote;
            } else {
              const qi = this.findMessageIndex(data.parent_id);
              this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].votes_count += data.vote;
            }
            break;
          }
          case this.discussionChatChannel.ACTIONS.TOGGLE_BLOCK: {
            this.blocked = data.blocked;
            if (this.blocked) {
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
    const currentValue = this.chatMessageForm.get('content').value || '';
    this.chatMessageForm.patchValue({
      content: currentValue.concat(event.emoji.native),
    });
    this.inputElement?.nativeElement.focus();
  }
}
