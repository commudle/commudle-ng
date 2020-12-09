import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, Inject, PLATFORM_ID} from '@angular/core';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import * as moment from 'moment';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { UserMessagesService } from 'projects/commudle-admin/src/app/services/user-messages.service';
import { DiscussionQnAChannel } from '../services/websockets/discussion-qna.channel';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-discussion-qna',
  templateUrl: './discussion-qna.component.html',
  styleUrls: ['./discussion-qna.component.scss']
})
export class DiscussionQnAComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  @Input() discussion: IDiscussion;
  @Output() newMessage = new EventEmitter();

  moment = moment;

  currentUser: ICurrentUser;
  messages: IUserMessage[] = [];
  permittedActions = [];
  pageSize = 10;
  nextPage = 1;
  allMessagesLoaded = false;
  loadingMessages = false;
  showReplyForm = 0;
  allActions;
  subscriptions = [];


  chatMessageForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]]
  });


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private userMessagesService: UserMessagesService,
    private discussionQnaChannel: DiscussionQnAChannel,
    private authWatchService: LibAuthwatchService

  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        user => this.currentUser = user
      )
    );
    this.discussionQnaChannel.subscribe(`${this.discussion.id}`);
    this.receiveData();
    this.allActions = this.discussionQnaChannel.ACTIONS;
    this.getDiscussionMessages();
  }

  ngOnDestroy() {
    this.discussionQnaChannel.unsubscribe();
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
    if (this.messagesContainer.nativeElement.scrollTop >= (this.messagesContainer.nativeElement.scrollHeight - 800)) {
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
      this.userMessagesService.pGetDiscussionChatMessages(this.discussion.id, this.nextPage, this.pageSize).subscribe(
        data => {
          if (data.user_messages.length !== this.pageSize) {
            this.allMessagesLoaded = true;
          }
          this.messages.push(...data.user_messages);
          this.loadingMessages = false;
          this.reorder();
          this.nextPage += 1;

        }
      );
    }
  }


  toggleReplyForm(messageId) {
    this.showReplyForm === messageId ? (this.showReplyForm = 0) : (this.showReplyForm = messageId);
  }

  sendMessage() {
    this.discussionQnaChannel.sendData(
      this.discussionQnaChannel.ACTIONS.ADD,
      {
        user_message: {
          content: this.chatMessageForm.get('content').value
        }
      }
    );
    this.chatMessageForm.reset();
  }


  sendVote(userMessageId) {
    this.discussionQnaChannel.sendData(
      this.discussionQnaChannel.ACTIONS.VOTE,
      {
        user_message_id: userMessageId
      }
    );
  }

  sendFlag(userMessageId) {
    this.discussionQnaChannel.sendData(
      this.discussionQnaChannel.ACTIONS.FLAG,
      {
        user_message_id: userMessageId
      }
    );
  }

  delete(userMessageId) {
    this.discussionQnaChannel.sendData(
      this.discussionQnaChannel.ACTIONS.DELETE,
      {
        user_message_id: userMessageId
      }
    );
  }

  sendReply(replyContent, userMessageId) {
    this.discussionQnaChannel.sendData(
      this.discussionQnaChannel.ACTIONS.REPLY,
      {
        user_message_id: userMessageId,
        reply_message: replyContent
      }
    );
  }


  receiveData() {
    this.subscriptions.push(
      this.discussionQnaChannel.channelData$.subscribe(
        (data) => {
          if (data) {
            switch (data.action) {
              case(this.discussionQnaChannel.ACTIONS.SET_PERMISSIONS): {
                this.permittedActions = data.permitted_actions;
                break;
              }
              case(this.discussionQnaChannel.ACTIONS.ADD): {
                this.messages.push(data.user_message);
                this.scrollToBottom();
                this.newMessage.emit();
                break;
              }
              case(this.discussionQnaChannel.ACTIONS.REPLY): {
                this.messages[this.findMessageIndex(data.parent_id)].user_messages.push(data.user_message);
                this.newMessage.emit();
                break;
              }
              case(this.discussionQnaChannel.ACTIONS.DELETE): {
                if (data.parent_type === 'Discussion') {
                  this.messages.splice(this.findMessageIndex(data.user_message_id), 1);
                } else {
                  const qi = this.findMessageIndex(data.parent_id);
                  this.messages[qi].user_messages.splice(this.findReplyIndex(qi, data.user_message_id), 1);
                }

                break;
              }
              case(this.discussionQnaChannel.ACTIONS.FLAG): {
                if (data.parent_type === 'Discussion') {
                  this.messages[this.findMessageIndex(data.user_message_id)].flags_count += data.flag;
                } else {
                  const qi = this.findMessageIndex(data.parent_id);
                  this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].flags_count += data.flag;
                }
                break;
              }
              case(this.discussionQnaChannel.ACTIONS.VOTE): {
                if (data.parent_type === 'Discussion') {
                  this.messages[this.findMessageIndex(data.user_message_id)].votes_count += data.vote;
                } else {
                  const qi = this.findMessageIndex(data.parent_id);
                  this.messages[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].votes_count += data.vote;
                  this.reorder();
                }
                break;
              }
              case(this.discussionQnaChannel.ACTIONS.ERROR): {
                this.toastLogService.warningDialog(data.message, 2000);
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


  reorder() {
    if (this.isBrowser) {
      this.messages = (this.messages.sort((a, b) => a.votes_count > b.votes_count ? -1 : a.votes_count < b.votes_count ? 1 : 0));
    }

  }

}
