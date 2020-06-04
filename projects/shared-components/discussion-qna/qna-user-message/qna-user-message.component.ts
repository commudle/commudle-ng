import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import * as moment from 'moment';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';


@Component({
  selector: 'app-qna-user-message',
  templateUrl: './qna-user-message.component.html',
  styleUrls: ['./qna-user-message.component.scss']
})
export class QnaUserMessageComponent implements OnInit {
  @Input() message: IUserMessage;
  @Input() canReply: boolean;
  @Input() canVote: boolean;
  @Input() permittedActions;
  @Input() allActions;
  @Input() currentUser: ICurrentUser;
  @Output() sendVote = new EventEmitter();
  @Output() sendReply = new EventEmitter();
  @Output() sendFlag = new EventEmitter();
  @Output() sendDelete = new EventEmitter();

  moment = moment;

  showReplyForm = false;



  userMessageReplyForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]]
  });


  constructor(
    private authWatchService: LibAuthwatchService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }



  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }

  emitVote(userMessageId) {
    this.sendVote.emit(userMessageId);
  }

  emitFlag(userMessageId) {
    this.sendFlag.emit(userMessageId);
  }

  emitDelete(userMessageId) {
    this.sendDelete.emit(userMessageId);
  }

  emitReply() {
    this.sendReply.emit(this.userMessageReplyForm.value);
    this.userMessageReplyForm.reset();
  }

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }


}
