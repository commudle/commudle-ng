import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { UserMessagesService } from 'projects/commudle-admin/src/app/services/user-messages.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { TrackSlotQuestionsChannel } from 'projects/commudle-admin/src/app/services/websockets/track-slot-questions.channel';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import * as moment from 'moment';

@Component({
  selector: 'app-speaker-session-discussion',
  templateUrl: './speaker-session-discussion.component.html',
  styleUrls: ['./speaker-session-discussion.component.scss']
})
export class SpeakerSessionDiscussionComponent implements OnInit, OnDestroy {
  moment = moment;
  @Input() trackSlot: ITrackSlot;
  @Input() isActive: boolean;
  discussion: IDiscussion;
  questions: IUserMessage[] = [];
  permittedActions = [];
  pageSize = 10;
  nextPage = 1;
  allQuestionsLoaded = false;
  loadingQuestions = true;
  currentUser: ICurrentUser;
  showReplyForm = 0;
  allActions;


  userQuestionForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200), NoWhitespaceValidator]]
  });

  constructor(
    private discussionsService: DiscussionsService,
    private userMessagesService: UserMessagesService,
    private fb: FormBuilder,
    private trackSlotQuestionsChannel: TrackSlotQuestionsChannel,
    private authWatchService: LibAuthwatchService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.getDiscussion();
    this.allActions = this.trackSlotQuestionsChannel.ACTIONS;
    this.authWatchService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnDestroy() {
    this.trackSlotQuestionsChannel.unsubscribe();
  }

  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }


  getDiscussion() {
    this.discussionsService.getOrCreateByTrackSlot(this.trackSlot.id).subscribe(
      data => {
        this.discussion = data;
        this.reorder();
        this.loadingQuestions = false;
        this.trackSlotQuestionsChannel.subscribe(`${this.discussion.id}`);
        this.receiveData();
        this.getDiscussionMessages();
      }
    );
  }

  getDiscussionMessages() {
    if (!this.allQuestionsLoaded && !this.loadingQuestions) {
      this.loadingQuestions = true;
      this.userMessagesService.getTrackSlotDiscussionQuestions(this.discussion.id, this.nextPage, this.pageSize).subscribe(
        data => {
          if (data.user_messages.length !== this.pageSize) {
            this.allQuestionsLoaded = true;
          }
          this.questions.push(...data.user_messages);
          this.loadingQuestions = false;
          this.nextPage += 1;
        }
      );
    }
  }

  toggleReplyForm(messageId) {
    this.showReplyForm === messageId ? (this.showReplyForm = 0) : (this.showReplyForm = messageId);
  }

  sendQuestion() {
    this.trackSlotQuestionsChannel.sendData(
      this.trackSlotQuestionsChannel.ACTIONS.ADD,
      {
        user_message: {
          content: this.userQuestionForm.get('content').value
        }
      }
    );
    this.userQuestionForm.reset();
  }

  sendVote(userMessageId) {
    this.trackSlotQuestionsChannel.sendData(
      this.trackSlotQuestionsChannel.ACTIONS.VOTE,
      {
        user_message_id: userMessageId
      }
    );
  }

  sendFlag(userMessageId) {
    this.trackSlotQuestionsChannel.sendData(
      this.trackSlotQuestionsChannel.ACTIONS.FLAG,
      {
        user_message_id: userMessageId
      }
    );
  }

  delete(userMessageId) {
    this.trackSlotQuestionsChannel.sendData(
      this.trackSlotQuestionsChannel.ACTIONS.DELETE,
      {
        user_message_id: userMessageId
      }
    );
  }

  sendReply(replyContent, userMessageId) {
    this.trackSlotQuestionsChannel.sendData(
      this.trackSlotQuestionsChannel.ACTIONS.REPLY,
      {
        user_message_id: userMessageId,
        reply_message: replyContent
      }
    );
  }


  receiveData() {
    this.trackSlotQuestionsChannel.channelData$.subscribe(
      (data) => {
        if (data) {
          switch (data.action) {
            case(this.trackSlotQuestionsChannel.ACTIONS.SET_PERMISSIONS): {
              this.permittedActions = data.permitted_actions;
              break;
            }
            case(this.trackSlotQuestionsChannel.ACTIONS.ADD): {
              this.questions.unshift(data.user_message);
              break;
            }
            case(this.trackSlotQuestionsChannel.ACTIONS.REPLY): {
              this.questions[this.findQuestionIndex(data.parent_id)].user_messages.push(data.user_message);
              break;
            }
            case(this.trackSlotQuestionsChannel.ACTIONS.DELETE): {
              if (data.parent_type === 'Discussion') {
                this.questions.splice(this.findQuestionIndex(data.user_message_id), 1);
              } else {
                const qi = this.findQuestionIndex(data.parent_id);
                this.questions[qi].user_messages.splice(this.findReplyIndex(qi, data.user_message_id), 1);
              }

              break;
            }
            case(this.trackSlotQuestionsChannel.ACTIONS.FLAG): {
              if (data.parent_type === 'Discussion') {
                this.questions[this.findQuestionIndex(data.user_message_id)].flags_count += data.flag;
              } else {
                const qi = this.findQuestionIndex(data.parent_id);
                this.questions[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].flags_count += data.flag;
              }
              break;
            }
            case(this.trackSlotQuestionsChannel.ACTIONS.VOTE): {
              if (data.parent_type === 'Discussion') {
                this.questions[this.findQuestionIndex(data.user_message_id)].votes_count += data.vote;
              } else {
                const qi = this.findQuestionIndex(data.parent_id);
                this.questions[qi].user_messages[this.findReplyIndex(qi, data.user_message_id)].votes_count += data.vote;
              }
              break;
            }
            case(this.trackSlotQuestionsChannel.ACTIONS.ERROR): {
              this.toastLogService.warningDialog(data.message, 2000);
            }
          }
        }

      }
    );
  }


  findQuestionIndex(userMessageId) {
    return this.questions.findIndex(q => (q.id === userMessageId));
  }


  findReplyIndex(questionIndex, replyId) {
    return this.questions[questionIndex].user_messages.findIndex(q => (q.id === replyId));
  }


  reorder() {
    setInterval(() => {
      this.questions = (this.questions.sort((a, b) => a.votes_count > b.votes_count ? -1 : a.votes_count < b.votes_count ? 1 : 0));
    }, 10000);
  }


}
