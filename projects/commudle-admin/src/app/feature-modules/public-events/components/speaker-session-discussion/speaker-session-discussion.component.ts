import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { UserMessagesService } from 'projects/commudle-admin/src/app/services/user-messages.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { TrackSlotQuestionsChannel } from 'projects/commudle-admin/src/app/services/websockets/track-slot-questions.channel';


@Component({
  selector: 'app-speaker-session-discussion',
  templateUrl: './speaker-session-discussion.component.html',
  styleUrls: ['./speaker-session-discussion.component.scss']
})
export class SpeakerSessionDiscussionComponent implements OnInit, OnDestroy {

  @Input() trackSlot: ITrackSlot;
  discussion: IDiscussion;
  questions: IUserMessage[] = [];
  permittedActions = [];
  pageSize = 10;
  nextPage = 1;
  allQuestionsLoaded = false;
  loadingQuestions = true;

  allActions;


  userQuestionForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200), NoWhitespaceValidator]]
  });

  constructor(
    private discussionsService: DiscussionsService,
    private userMessagesService: UserMessagesService,
    private fb: FormBuilder,
    private trackSlotQuestionsChannel: TrackSlotQuestionsChannel
  ) { }

  ngOnInit() {
    this.getDiscussion();
    this.allActions = this.trackSlotQuestionsChannel.ACTIONS;
  }

  ngOnDestroy() {
    this.trackSlotQuestionsChannel.unsubscribe();
  }


  getDiscussion() {
    this.discussionsService.getOrCreateByTrackSlot(this.trackSlot.id).subscribe(
      data => {
        this.discussion = data;
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

  sendReply() {

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
            case(this.trackSlotQuestionsChannel.ACTIONS.DELETE): {
              this.questions.splice(this.findQuestionIndex(data.user_message_id), 1);
              break;
            }
            case(this.trackSlotQuestionsChannel.ACTIONS.FLAG): {
              this.questions[this.findQuestionIndex(data.user_message_id)].flags_count += data.flag;
              break;
            }
            case(this.trackSlotQuestionsChannel.ACTIONS.VOTE): {
              this.questions[this.findQuestionIndex(data.user_message_id)].votes_count += data.vote;
              break;
            }
          }
        }

      }
    );
  }


  findQuestionIndex(userMessageId) {
    return this.questions.findIndex(q => (q.id === userMessageId));

  }


}
