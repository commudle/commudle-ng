import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {IDiscussion} from 'projects/shared-models/discussion.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {IUserMessage} from 'projects/shared-models/user_message.model';
import {FormBuilder, Validators} from '@angular/forms';
import {NoWhitespaceValidator} from 'projects/shared-helper-modules/custom-validators.validator';
import {LibToastLogService} from 'projects/shared-services/lib-toastlog.service';
import {UserMessagesService} from 'projects/commudle-admin/src/app/services/user-messages.service';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {Subscription} from 'rxjs';
import {LabDiscussionChatChannel} from '../../../services/websockets/lab-discussion-chat.channel';

@Component({
  selector: 'app-lab-discussion',
  templateUrl: './lab-discussion.component.html',
  styleUrls: ['./lab-discussion.component.scss']
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
  // allMessagesLoaded = false;
  showReplyForm = 0;
  allActions;
  chatMessageForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]]
  });

  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private userMessagesService: UserMessagesService,
    private discussionChatChannel: LabDiscussionChatChannel,
    private authWatchService: LibAuthwatchService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(user => this.currentUser = user));
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

    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }

  getDiscussionMessages() {
    // if (!this.allMessagesLoaded) {
    this.userMessagesService.pGetDiscussionChatMessages(this.discussion.id, this.currentPageNumber, this.pageSize).subscribe(data => {
      if (data.user_messages.length === 0) {
        // this.allMessagesLoaded = true;
        this.messagesCount.emit(this.messages.length);
      } else {
        this.messages.push(...data.user_messages);
        this.currentPageNumber += 1;
        this.getDiscussionMessages();
      }
    });
    // }
  }

  toggleReplyForm(messageId) {
    this.showReplyForm === messageId ? (this.showReplyForm = 0) : (this.showReplyForm = messageId);
  }

  sendMessage() {
    this.discussionChatChannel.sendData(
      this.discussionChatChannel.ACTIONS.ADD,
      {
        user_message: {
          content: this.chatMessageForm.get('content').value
        }
      }
    );
    this.chatMessageForm.reset();
  }

  sendFlag(userMessageId) {
    this.discussionChatChannel.sendData(
      this.discussionChatChannel.ACTIONS.FLAG,
      {
        user_message_id: userMessageId
      }
    );
  }

  delete(userMessageId) {
    this.discussionChatChannel.sendData(
      this.discussionChatChannel.ACTIONS.DELETE,
      {
        user_message_id: userMessageId
      }
    );
  }

  sendReply(replyContent, userMessageId) {
    this.discussionChatChannel.sendData(
      this.discussionChatChannel.ACTIONS.REPLY,
      {
        user_message_id: userMessageId,
        reply_message: replyContent
      }
    );
  }

  receiveData() {
    this.subscriptions.push(
      this.discussionChatChannel.channelData$.subscribe(data => {
        if (data) {
          switch (data.action) {
            case(this.discussionChatChannel.ACTIONS.SET_PERMISSIONS): {
              this.permittedActions = data.permitted_actions;
              break;
            }
            case(this.discussionChatChannel.ACTIONS.ADD): {
              this.messages.unshift(data.user_message);
              this.newMessage.emit();
              break;
            }
            case(this.discussionChatChannel.ACTIONS.REPLY): {
              this.messages[this.findMessageIndex(data.parent_id)].user_messages.push(data.user_message);
              this.newMessage.emit();
              break;
            }
            case(this.discussionChatChannel.ACTIONS.DELETE): {
              if (data.parent_type === 'Discussion') {
                this.messages.splice(this.findMessageIndex(data.user_message_id), 1);
              } else {
                const qi = this.findMessageIndex(data.parent_id);
                this.messages[qi].user_messages.splice(this.findReplyIndex(qi, data.user_message_id), 1);
              }
              break;
            }
            case(this.discussionChatChannel.ACTIONS.FLAG): {
              if (data.parent_type === 'Discussion') {
                this.messages[this.findMessageIndex(data.user_message_id)].flags_count += data.flag;
              } else {
                const qi = this.findMessageIndex(data.parent_id);
                this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].flags_count += data.flag;
              }
              break;
            }
            case(this.discussionChatChannel.ACTIONS.ERROR): {
              this.toastLogService.warningDialog(data.message, 2000);
            }
          }
        }
      })
    );
  }

  findMessageIndex(userMessageId) {
    return this.messages.findIndex(q => (q.id === userMessageId));
  }

  findReplyIndex(questionIndex, replyId) {
    return this.messages[questionIndex].user_messages.findIndex(q => (q.id === replyId));
  }

}
