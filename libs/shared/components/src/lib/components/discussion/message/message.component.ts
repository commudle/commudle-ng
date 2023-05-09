import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IEditorValidator } from '@commudle/editor';
import { IUserMessage } from '@commudle/shared-models';
import { AuthService } from '@commudle/shared-services';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DiscussionHandlerService } from '../../../services/discussion-handler.service';
import { UserMessageReceiptHandlerService } from '../../../services/user-message-receipt-handler.service';

@Component({
  selector: 'commudle-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, AfterViewInit {
  @Input() message!: IUserMessage;
  @Input() canReply = true;

  validators: IEditorValidator = {
    required: true,
    minLength: 1,
    maxLength: 200,
    noWhitespace: true,
  };

  showReply$ = new BehaviorSubject<boolean>(false);

  @ViewChild('messageRef') messageRef!: ElementRef<HTMLDivElement>;

  protected readonly moment = moment;

  constructor(
    public authService: AuthService,
    public discussionHandlerService: DiscussionHandlerService,
    private userMessageReceiptHandlerService: UserMessageReceiptHandlerService,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scrollToMessage();
  }

  toggleReply() {
    this.showReply$.next(!this.showReply$.value);
  }

  markAsRead(messageId: number, { visible }: { visible: boolean }): void {
    if (messageId && visible) {
      this.userMessageReceiptHandlerService.addMessageReceipt(messageId, new Date());
    }
  }

  scrollToMessage() {
    if (this.discussionHandlerService.lastReadMessageId === this.message.id) {
      this.messageRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }
}
