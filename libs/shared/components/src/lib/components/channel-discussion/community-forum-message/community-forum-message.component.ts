import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IEditorValidator } from '@commudle/editor';
import { IUserMessage } from '@commudle/shared-models';
import { AuthService, ShareService } from '@commudle/shared-services';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { UserMessageReceiptHandlerService } from '../../../services/user-message-receipt-handler.service';
import { CommunityChannelHandlerService } from 'libs/shared/components/src/lib/services/community-channel-handler.service';
import { NbMenuService, NbWindowRef, NbWindowService } from '@commudle/theme';
import { environment } from '@commudle/shared-environments';
import { filter } from 'rxjs';
import { faReply, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'commudle-community-forum-message',
  templateUrl: './community-forum-message.component.html',
  styleUrls: ['./community-forum-message.component.scss'],
})
export class CommunityForumMessageComponent implements OnInit, AfterViewInit {
  @Input() message!: IUserMessage;
  @Input() cursor!: string;
  @Input() canReply = true;
  showReplies = false;
  environment = environment;
  faReply = faReply;
  faShareNodes = faShareNodes;

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
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
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
      });
  }

  ngAfterViewInit(): void {
    this.scrollToMessage();
  }

  toggleReply() {
    this.showReply$.next(!this.showReply$.value);
  }

  toggleShowReply() {
    this.showReplies = !this.showReplies;
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
    this.activatedRoute.queryParams.subscribe((params) => {
      const discussionType = params['discussion-type'];
      const forumName = params['forum-name'];
      const discussionId = params['discussion-id'];
      const shareLink = `localhost:4200/${window.location.pathname}?after=${this.cursor}&discussion-type=${discussionType}&forum-name=${forumName}&discussion-id=${discussionId}`;
      this.shareService.shareContent(
        shareLink,
        'Hey, check out this discussion on Commudle',
        this.message.content.length > 40 ? `${this.message.content.substring(0, 40)}...` : this.message.content,
        'Copied message link successfully!',
        'Shared message successfully!',
      );
    });
  }

  openEditForm(): void {
    this.editMessageTemplateRef = this.nbWindowService.open(this.editMessageTemplate, {
      title: 'Edit your message',
      windowClass: 'remove-overflow-mention',
    });
  }
}
