import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DiscussionChatChannel } from '@commudle/shared-components';
import { ICurrentUser, IDiscussion, IUserMessage } from '@commudle/shared-models';
import { LibAuthwatchService, LibToastLogService, UserMessagesService } from '@commudle/shared-services';
import { NoWhitespaceValidator } from '@commudle/shared-validators';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-lab-discussion',
  templateUrl: './lab-discussion.component.html',
  styleUrls: ['./lab-discussion.component.scss'],
})
export class LabDiscussionComponent implements OnInit, OnDestroy, OnChanges {
  @Input() discussion: IDiscussion;
  @Output() newMessage = new EventEmitter();
  @Output() messagesCount: EventEmitter<number> = new EventEmitter<number>();

  subscriptions: Subscription[] = [];
  moment = moment;
  currentUser: ICurrentUser;
  permittedActions = [];
  messages: IUserMessage[] = [];
  pageSize = 10;
  currentPageNumber = 1;
  showReplyForm = 0;
  allActions;
  chatMessageForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000), NoWhitespaceValidator]],
  });
  limitRows = 5;
  messageLastScrollHeight: number;
  showHelperText = false;

  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private userMessagesService: UserMessagesService,
    private discussionChatChannel: DiscussionChatChannel,
    private authWatchService: LibAuthwatchService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((user) => (this.currentUser = user)));
    this.allActions = this.discussionChatChannel.ACTIONS;
    this.receiveData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.discussion) {
      // Reset discussion parameters
      this.messages = [];
      this.pageSize = 10;
      this.currentPageNumber = 1;
      this.discussionChatChannel.unsubscribe();
      this.discussionChatChannel.subscribe(`${this.discussion.id}`);
      this.allActions = this.discussionChatChannel.ACTIONS;
      // Get all discussion messages
      this.getDiscussionMessages();
    }
  }

  ngOnDestroy(): void {
    this.discussionChatChannel.unsubscribe();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  showText() {
    this.showHelperText = true;
  }

  hideText() {
    this.showHelperText = false;
  }

  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }

  getDiscussionMessages() {
    this.userMessagesService
      .pGetDiscussionChatMessages(this.discussion.id, this.currentPageNumber, this.pageSize)
      .subscribe((data) => {
        if (data.user_messages.length === 0) {
          this.messagesCount.emit(this.messages.length);
        } else {
          this.messages.push(...data.user_messages);
          this.currentPageNumber += 1;
          this.getDiscussionMessages();
        }
      });
  }

  sendMessage() {
    this.discussionChatChannel.sendData(this.discussionChatChannel.ACTIONS.ADD, {
      user_message: {
        content: this.chatMessageForm.get('content').value,
      },
    });
    this.chatMessageForm.reset();
  }

  sendFlag(userMessageId) {
    this.discussionChatChannel.sendData(this.discussionChatChannel.ACTIONS.FLAG, {
      user_message_id: userMessageId,
    });
  }

  delete({ userMessageId, isSelfMessage }) {
    const action = isSelfMessage
      ? this.discussionChatChannel.ACTIONS.DELETE_SELF
      : this.discussionChatChannel.ACTIONS.DELETE_ANY;
    this.discussionChatChannel.sendData(action, {
      user_message_id: userMessageId,
    });
  }

  sendReply(replyContent, userMessageId) {
    this.discussionChatChannel.sendData(this.discussionChatChannel.ACTIONS.REPLY, {
      user_message_id: userMessageId,
      reply_message: replyContent,
    });
  }

  receiveData() {
    this.subscriptions.push(
      this.discussionChatChannel.channelData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.discussionChatChannel.ACTIONS.SET_PERMISSIONS:
              this.permittedActions = data.permitted_actions;
              break;
            case this.discussionChatChannel.ACTIONS.ADD:
              this.messages.unshift(data.user_message);
              this.newMessage.emit();
              break;
            case this.discussionChatChannel.ACTIONS.REPLY:
              this.messages[this.findMessageIndex(data.parent_id)].user_messages.push(data.user_message);
              this.newMessage.emit();
              break;
            case this.discussionChatChannel.ACTIONS.DELETE_ANY:
            case this.discussionChatChannel.ACTIONS.DELETE_SELF:
              if (data.parent_type === 'Discussion') {
                this.messages.splice(this.findMessageIndex(data.user_message_id), 1);
              } else {
                const qi = this.findMessageIndex(data.parent_id);
                this.messages[qi].user_messages.splice(this.findReplyIndex(qi, data.user_message_id), 1);
              }
              break;
            case this.discussionChatChannel.ACTIONS.FLAG:
              if (data.parent_type === 'Discussion') {
                this.messages[this.findMessageIndex(data.user_message_id)].flags_count += data.flag;
              } else {
                const qi = this.findMessageIndex(data.parent_id);
                this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].flags_count += data.flag;
              }
              break;
            case this.discussionChatChannel.ACTIONS.ERROR:
              this.toastLogService.warningDialog(data.message, 2000);
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

  handleInputSize() {
    let rows = this.messageInput.nativeElement.getAttribute('rows');
    this.messageInput.nativeElement.setAttribute('rows', '1');

    if (rows < this.limitRows && this.messageInput.nativeElement.scrollHeight > this.messageLastScrollHeight) {
      rows++;
    } else if (rows > 1 && this.messageInput.nativeElement.scrollHeight < this.messageLastScrollHeight) {
      rows--;
    }

    this.messageLastScrollHeight = this.messageInput.nativeElement.scrollHeight;
    this.messageInput.nativeElement.setAttribute('rows', rows);
  }
}
