import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IEditorValidator } from '@commudle/editor';
import { IUserMessage } from '@commudle/shared-models';
import { AuthService, ShareService } from '@commudle/shared-services';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DiscussionHandlerService } from '../../../services/discussion-handler.service';
import { UserMessageReceiptHandlerService } from '../../../services/user-message-receipt-handler.service';

@Component({
  selector: 'commudle-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit, AfterViewInit {
  @Input() message!: IUserMessage;
  @Input() cursor!: string;
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
    private shareService: ShareService,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scrollToMessage();
  }

  toggleReply() {
    this.showReply$.next(!this.showReply$.value);
  }

  markAsRead(messageId: number, { visible }: { visible: boolean }): void {
    if (messageId && visible && this.authService.getCurrentUser()?.id) {
      this.userMessageReceiptHandlerService.addMessageReceipt(messageId, new Date());
    }
  }

  scrollToMessage() {
    if (this.authService.getCurrentUser()?.id && this.discussionHandlerService.scrollToMessageId === this.message.id) {
      this.messageRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  share(): void {
    const shareLink = `${window.location.pathname}?after=${this.cursor}`;

    this.shareService.shareContent(
      shareLink,
      'Hey, check out this discussion on Commudle',
      this.message.content.length > 40 ? `${this.message.content.substring(0, 40)}...` : this.message.content,
      shareLink,
      'Copied message link successfully!',
      'Shared message successfully!',
    );
  }
}
