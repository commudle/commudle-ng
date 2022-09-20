import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserMessage } from '@commudle/shared-models';
import { ICurrentUser } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';
import * as moment from 'moment';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from '@commudle/shared-validators';

@Component({
  selector: 'commudle-user-personal-chat-message',
  templateUrl: './user-personal-chat-message.component.html',
  styleUrls: ['./user-personal-chat-message.component.scss']
})
export class UserPersonalChatMessageComponent implements OnInit {
  @Input() message: IUserMessage;
  @Input() canReply: boolean;
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
