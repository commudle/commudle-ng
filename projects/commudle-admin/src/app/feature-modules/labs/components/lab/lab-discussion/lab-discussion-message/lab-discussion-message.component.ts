import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-lab-discussion-message',
  templateUrl: './lab-discussion-message.component.html',
  styleUrls: ['./lab-discussion-message.component.scss'],
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
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000), NoWhitespaceValidator]],
  });
  limitRows = 3;
  messageLastScrollHeight: number;

  @ViewChild('messageInput') private messageInput: ElementRef;

  constructor(private authWatchService: LibAuthwatchService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }

  emitFlag(userMessageId) {
    this.sendFlag.emit(userMessageId);
  }

  emitDelete(userMessageId, isSelfMessage) {
    this.sendDelete.emit({ userMessageId, isSelfMessage });
  }

  emitReply() {
    this.sendReply.emit(this.userMessageReplyForm.value);
    this.userMessageReplyForm.reset();
  }

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
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
