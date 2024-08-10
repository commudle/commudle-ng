import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import * as moment from 'moment';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUserMessage } from 'apps/shared-models/user_message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit, AfterViewInit {
  @Input() messages: IUserMessage[] = [];
  @Input() currentUser: ICurrentUser;
  @Input() allActions;
  @Input() permittedActions;
  @Input() showMessagesLoader;
  @Input() discussionOpen: boolean;
  @Output() getPreviousMessages: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendReply: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFlag: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendDelete = new EventEmitter();

  moment = moment;
  messageContainer: HTMLDivElement;
  isNearBottom: boolean;

  @ViewChild('messagesList') messagesList: ElementRef<HTMLDivElement>;
  @ViewChildren('messageElement') messageElements: QueryList<any>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.messageContainer = this.messagesList.nativeElement;
    this.messageElements.changes.subscribe((value) => this.onMessageElementsChanged(value));
  }

  emitReply(messageId: number, content): void {
    this.sendReply.emit([messageId, content]);
  }

  emitFlag(messagedId: number): void {
    this.sendFlag.emit(messagedId);
  }

  emitDelete({ messageId, isSelfMessage }): void {
    this.sendDelete.emit({ messageId, isSelfMessage });
  }

  onMessageElementsChanged(value): void {
    if (this.isNearBottom || this.currentUser?.id === value.last.message.user.id) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    this.messageContainer.scroll({
      top: this.messageContainer.scrollHeight,
      behavior: 'smooth',
    });
  }

  onScroll(): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.messageContainer.scrollTop + this.messageContainer.offsetHeight;
    const height = this.messageContainer.scrollHeight;
    return position > height - threshold;
  }
}
