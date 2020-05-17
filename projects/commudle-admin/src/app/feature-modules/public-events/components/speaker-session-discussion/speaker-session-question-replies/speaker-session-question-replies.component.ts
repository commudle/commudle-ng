import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import * as moment from 'moment';

@Component({
  selector: 'app-speaker-session-question-replies',
  templateUrl: './speaker-session-question-replies.component.html',
  styleUrls: ['./speaker-session-question-replies.component.scss']
})
export class SpeakerSessionQuestionRepliesComponent implements OnInit {
  moment = moment;
  @Input() showReplyForm;
  @Input() userMessage: IUserMessage;
  @Input() canReply: boolean;
  @Input() canFlag: boolean;
  @Output() sendReply = new EventEmitter();
  @Output() sendFlag = new EventEmitter();

  // let's incorporate voting in some time
  // @Output() sendVote = new EventEmitter();

  userMessageReplyForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200), NoWhitespaceValidator]]
  });


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }


  emitReply() {
    this.sendReply.emit(this.userMessageReplyForm.value);
    this.userMessageReplyForm.reset();
  }

  emitFlag(userMessageId) {
    this.sendFlag.emit(userMessageId);
  }

}
