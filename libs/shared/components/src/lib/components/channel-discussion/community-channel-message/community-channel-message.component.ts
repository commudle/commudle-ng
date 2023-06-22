import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IEditorValidator } from '@commudle/editor';
import { IUserMessage } from '@commudle/shared-models';
import { AuthService, ShareService } from '@commudle/shared-services';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { UserMessageReceiptHandlerService } from '../../../services/user-message-receipt-handler.service';
import { CommunityChannelHandlerService } from 'libs/shared/components/src/lib/services/community-channel-handler.service';
import { NbMenuService, NbWindowRef, NbWindowService } from '@commudle/theme';
import { environment } from '@commudle/shared-environments';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-channel-message',
  templateUrl: './community-channel-message.component.html',
  styleUrls: ['./community-channel-message.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityChannelMessageComponent implements OnInit, AfterViewInit {
  @Input() message!: IUserMessage;
  @Input() cursor!: string;
  @Input() canReply = true;
  environment = environment;

  @ViewChild('editMessageTemplate', { static: true }) editMessageTemplate: TemplateRef<any>;
  editMessageTemplateRef: NbWindowRef;

  validators: IEditorValidator = {
    required: true,
    minLength: 1,
    maxLength: 200,
    noWhitespace: true,
  };

  showReply$ = new BehaviorSubject<boolean>(false);

  items = [{ title: 'Edit' }, { title: 'Delete' }, { title: 'Share This Message' }, { title: 'Pin Message' }];

  @ViewChild('messageRef') messageRef!: ElementRef<HTMLDivElement>;

  protected readonly moment = moment;

  constructor(
    public authService: AuthService,
    public communityChannelHandlerService: CommunityChannelHandlerService,
    private userMessageReceiptHandlerService: UserMessageReceiptHandlerService,
    private shareService: ShareService,
    private nbWindowService: NbWindowService,
    private nbMenuService: NbMenuService,
  ) {}

  ngOnInit(): void {
    // this.nbMenuService.onItemClick().subscribe((event) => {
    //   console.log(event);
    // });
    this.nbMenuService
      .onItemClick()
      .pipe(filter(({ tag }) => tag === 'chat-menu-' + this.message.id))
      .subscribe((event) => {
        if (event.item.title === 'Edit') {
          this.openEditForm();
        } else if (event.item.title === 'Delete') {
          this.communityChannelHandlerService.sendDelete(
            this.message.id,
            this.message.user.id === this.authService.getCurrentUser().id,
          );
        } else if (event.item.title === 'Share This Message') {
          this.share();
        } else if (event.item.title === 'Pin Message') {
          this.communityChannelHandlerService.pin(this.message.id);
        }
        // if (title === 'Edit') {
        //   // this.blocked = true;
        //   // console.log(tag);
        //   console.log('edit');
        // } else if (title === 'Unblock') {
        //   // this.blocked = false;
        // }
      });
  }

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
    if (
      this.authService.getCurrentUser()?.id &&
      this.communityChannelHandlerService.scrollToMessageId === this.message.id
    ) {
      this.messageRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  share(): void {
    const shareLink = `${this.environment.app_url}${window.location.pathname}?after=${this.cursor}`;
    this.shareService.shareContent(
      `${shareLink}`,
      'Hey, check out this discussion on Commudle',
      this.message.content.length > 40 ? `${this.message.content.substring(0, 40)}...` : this.message.content,
      shareLink,
      'Copied message link successfully!',
      'Shared message successfully!',
    );
  }

  openEditForm(): void {
    this.editMessageTemplateRef = this.nbWindowService.open(this.editMessageTemplate, {
      title: 'Edit your message',
      windowClass: 'remove-overflow-mention',
    });
  }
}
