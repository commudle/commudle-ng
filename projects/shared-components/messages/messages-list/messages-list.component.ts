import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IUserMessage } from 'projects/shared-models/user_message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  @Input() messages: IUserMessage[] = [];
  @Input() currentUser: ICurrentUser;
  @Input() allActions;
  @Input() permittedActions;
  @Input() showMessagesLoader;
  @Output() getPreviousMessages: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendReply: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFlag: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendDelete: EventEmitter<number> = new EventEmitter<number>();

  moment = moment;

  constructor() {
  }

  ngOnInit(): void {
  }

  emitReply(messageId: number, content): void {
    this.sendReply.emit([messageId, content]);
  }

  emitFlag(messagedId: number): void {
    this.sendFlag.emit(messagedId);
  }

  emitDelete(messageId: number): void {
    this.sendDelete.emit(messageId);
  }

}
