import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICurrentUser, IDiscussion, IUserMessage } from '@commudle/shared-models';
import { LibAuthwatchService, LibToastLogService, UserMessagesService } from '@commudle/shared-services';
import { NoWhitespaceValidator } from '@commudle/shared-validators';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { DiscussionChatChannel } from '../services/websockets/discussion-chat.channel';

@Component({
  selector: 'commudle-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy, AfterContentChecked {
  @Input() discussion: IDiscussion;
  @Output() newMessage: EventEmitter<any> = new EventEmitter<any>();

  currentUser: ICurrentUser;

  allActions;
  permittedActions = [];

  messages: IUserMessage[] = [];
  page = 1;
  count = 10;
  isLoadingMessages = true;
  showMessagesLoader = true;
  showEmojiPicker = false;

  faGrin = faGrin;

  messageForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]],
  });

  @ViewChild('messageInput') messageInputRef: ElementRef<HTMLInputElement>;

  subscriptions: Subscription[] = [];

  constructor(
    private libAuthwatchService: LibAuthwatchService,
    private discussionChatChannel: DiscussionChatChannel,
    private libToastLogService: LibToastLogService,
    private userMessagesService: UserMessagesService,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.libAuthwatchService.currentUser$.subscribe((value) => (this.currentUser = value)));
    this.discussionChatChannel.subscribe(`${this.discussion.id}`);
    this.allActions = this.discussionChatChannel.ACTIONS;
    this.receiveData();
    this.getDiscussionMessages();
  }

  ngOnDestroy(): void {
    this.discussionChatChannel.unsubscribe();
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  receiveData(): void {
    this.subscriptions.push(
      this.discussionChatChannel.channelData$.subscribe((value) => {
        if (value) {
          switch (value.action) {
            case this.discussionChatChannel.ACTIONS.SET_PERMISSIONS:
              this.permittedActions = value.permitted_actions;
              if (this.permittedActions.includes(this.discussionChatChannel.ACTIONS.BLOCKED)) {
                this.messageForm.disable();
              }
              break;
            case this.discussionChatChannel.ACTIONS.ADD:
              this.messages.push(value.user_message);
              this.newMessage.emit();
              break;
            case this.discussionChatChannel.ACTIONS.REPLY:
              this.messages[this.findMessageIndex(value.parent_id)].user_messages.push(value.user_message);
              this.newMessage.emit();
              break;
            case this.discussionChatChannel.ACTIONS.DELETE_ANY:
            case this.discussionChatChannel.ACTIONS.DELETE_SELF:
              if (value.parent_type === 'Discussion') {
                this.messages.splice(this.findMessageIndex(value.user_message_id), 1);
              } else {
                const qi = this.findMessageIndex(value.parent_id);
                this.messages[qi].user_messages.splice(this.findReplyIndex(qi, value.user_message_id), 1);
              }
              break;
            case this.discussionChatChannel.ACTIONS.FLAG:
              if (value.parent_type === 'Discussion') {
                this.messages[this.findMessageIndex(value.user_message_id)].flags_count += value.flag;
              } else {
                const qi = this.findMessageIndex(value.parent_id);
                this.messages[qi].user_messages[this.findReplyIndex(qi, value.user_message_id)].flags_count +=
                  value.flag;
              }
              break;
            case this.discussionChatChannel.ACTIONS.ERROR:
              this.libToastLogService.warningDialog(value.message, 2000);
              break;
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

  getDiscussionMessages(): void {
    if (this.isLoadingMessages) {
      this.subscriptions.push(
        this.userMessagesService
          .pGetDiscussionChatMessages(this.discussion.id, this.page, this.count)
          .subscribe((value) => {
            if (value.user_messages.length !== this.count) {
              this.isLoadingMessages = false;
              this.showMessagesLoader = false;
            }
            this.messages.unshift(...value.user_messages.reverse());
            this.page++;
          }),
      );
    }
  }

  sendMessage(): void {
    if (this.messageForm.valid) {
      const messageContent = this.messageForm.value;
      this.discussionChatChannel.sendData(this.discussionChatChannel.ACTIONS.ADD, { user_message: messageContent });
      this.messageForm.reset();
      this.messageForm.updateValueAndValidity();
      this.showEmojiPicker = false;
    }
  }

  sendReply(value): void {
    const messageId = value[0];
    const replyContent = value[1];
    this.discussionChatChannel.sendData(this.discussionChatChannel.ACTIONS.REPLY, {
      user_message_id: messageId,
      reply_message: replyContent,
    });
  }

  sendFlag(messageId: number): void {
    this.discussionChatChannel.sendData(this.discussionChatChannel.ACTIONS.FLAG, { user_message_id: messageId });
  }

  sendDelete({ messageId, isSelfMessage }): void {
    const action = isSelfMessage
      ? this.discussionChatChannel.ACTIONS.DELETE_SELF
      : this.discussionChatChannel.ACTIONS.DELETE_ANY;
    this.discussionChatChannel.sendData(action, { user_message_id: messageId });
  }

  addEmoji(event): void {
    this.messageForm.patchValue({
      content: (this.messageForm.get('content').value || '').concat(event.emoji.native),
    });
    this.messageInputRef.nativeElement.focus();
  }

  login() {
    window.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }
}
