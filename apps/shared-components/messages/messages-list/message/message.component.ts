import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import { NoWhitespaceValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUserMessage } from 'apps/shared-models/user_message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() canReply: boolean;
  @Input() message: IUserMessage;
  @Input() currentUser: ICurrentUser;
  @Input() allActions;
  @Input() permittedActions;
  @Output() sendReply: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFlag: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendDelete = new EventEmitter();

  moment = moment;

  showReplyForm = false;
  showEmojiPicker = false;
  isVotingBlocked = false;

  replyForm;

  @ViewChild('messageInput') messageInput: ElementRef<HTMLInputElement>;

  faGrin = faGrin;

  constructor(private fb: FormBuilder) {
    this.replyForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]],
    });
  }

  ngOnInit(): void {}

  emitReply(): void {
    if (this.replyForm.valid) {
      this.sendReply.emit(this.replyForm.value);
      this.replyForm.reset();
      this.replyForm.updateValueAndValidity();
      this.showReplyForm = false;
      this.showEmojiPicker = false;
    }
  }

  emitFlag(messageId: number): void {
    this.sendFlag.emit(messageId);
  }

  emitDelete(messageId: number, isSelfMessage: boolean): void {
    this.sendDelete.emit({ messageId, isSelfMessage });
  }

  addEmoji(event): void {
    this.replyForm.patchValue({
      content: (this.replyForm.get('content').value || '').concat(`${event.emoji.native}`),
    });
    this.messageInput.nativeElement.focus();
  }
}
