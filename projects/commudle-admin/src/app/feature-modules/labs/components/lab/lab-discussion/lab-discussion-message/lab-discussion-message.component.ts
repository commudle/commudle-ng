import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {IUserMessage} from 'projects/shared-models/user_message.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {FormBuilder, Validators} from '@angular/forms';
import {NoWhitespaceValidator} from 'projects/shared-helper-modules/custom-validators.validator';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-lab-discussion-message',
  templateUrl: './lab-discussion-message.component.html',
  styleUrls: ['./lab-discussion-message.component.scss']
})
export class LabDiscussionMessageComponent implements OnInit {

  @Input() message: IUserMessage;
  @Input() canReply: boolean;
  @Input() permittedActions;
  @Input() allActions;
  @Input() currentUser: ICurrentUser;
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
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
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
