import { Component, Input, OnInit } from '@angular/core';
import { IEditorValidator } from '@commudle/editor';
import { IUserMessage } from '@commudle/shared-models';
import { AuthService } from '@commudle/shared-services';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DiscussionHandlerService } from '../../../services/discussion-handler.service';

@Component({
  selector: 'commudle-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message!: IUserMessage;
  @Input() canReply = true;

  validators: IEditorValidator = {
    required: true,
    minLength: 1,
    maxLength: 200,
    noWhitespace: true,
  };

  showReply$ = new BehaviorSubject<boolean>(false);

  protected readonly moment = moment;

  constructor(public authService: AuthService, public discussionHandlerService: DiscussionHandlerService) {}

  ngOnInit(): void {}

  toggleReply() {
    this.showReply$.next(!this.showReply$.value);
  }
}
