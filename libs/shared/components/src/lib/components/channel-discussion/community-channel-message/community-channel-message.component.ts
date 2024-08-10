import { SeoService } from '@commudle/shared-services';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IEditorValidator } from '@commudle/editor';
import { EUserRoles, ICommunityChannel, IUserMessage } from '@commudle/shared-models';
import {
  AuthService,
  CommunityChannelManagerService,
  CommunityChannelsService,
  ShareService,
  ToastrService,
} from '@commudle/shared-services';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { UserMessageReceiptHandlerService } from '../../../services/user-message-receipt-handler.service';
import { CommunityChannelHandlerService } from 'libs/shared/components/src/lib/services/community-channel-handler.service';
import { NbDialogRef, NbDialogService, NbMenuService } from '@commudle/theme';
import { environment } from '@commudle/shared-environments';
import { filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-community-channel-message',
  templateUrl: './community-channel-message.component.html',
  styleUrls: ['./community-channel-message.component.scss'],
})
export class CommunityChannelMessageComponent implements OnInit, AfterViewInit {
  @Input() message!: IUserMessage;
  @Input() cursor!: string;
  @Input() canReply = true;
  @Input() messagePinned = false;
  @Input() channelOrForum: ICommunityChannel;

  EUserRoles = EUserRoles;

  channelsRoles = {};
  channelOrForumId: number;

  environment = environment;

  faThumbtack = faThumbtack;

  @ViewChild('editMessageTemplate', { static: true }) editMessageTemplate: TemplateRef<any>;
  editMessageTemplateRef: NbDialogRef<any>;

  validators: IEditorValidator = {
    required: true,
    minLength: 1,
    maxLength: 200,
    noWhitespace: true,
  };

  showReply$ = new BehaviorSubject<boolean>(false);

  contextMenuItems = [];

  @ViewChild('messageRef') messageRef!: ElementRef<HTMLDivElement>;

  protected readonly moment = moment;

  constructor(
    public authService: AuthService,
    public communityChannelHandlerService: CommunityChannelHandlerService,
    private userMessageReceiptHandlerService: UserMessageReceiptHandlerService,
    private shareService: ShareService,
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private libToastLogService: ToastrService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.seoSchema();
    this.channelOrForumId = this.activatedRoute.snapshot.params.community_channel_id;
    this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
      this.channelsRoles = data;
    });
    if (!this.messagePinned) {
      this.nbMenuService
        .onItemClick()
        .pipe(filter(({ tag }) => tag === 'chat-menu-' + this.message.id))
        .subscribe((event) => {
          if (event.item.title === 'Edit') {
            this.openEditForm();
          } else if (event.item.title === 'Delete') {
            this.communityChannelHandlerService.sendDelete(this.message.id);
          } else if (event.item.title === 'Share This Message') {
            this.share();
          } else if (event.item.title === 'Pin Message') {
            this.pinMessage(this.message);
          } else if (event.item.title === 'Unpin Message') {
            this.unpinMessage(this.message);
          } else if (event.item.title === 'Email to all members') {
            this.sendMessageByEmail(this.message.id);
          }
        });
      if (this.authService.getCurrentUser()?.id === this.message.user.id) {
        this.contextMenuItems.push({
          title: 'Edit',
        });
      }
      if (
        this.authService.getCurrentUser()?.id === this.message.user.id ||
        this.channelsRoles[this.channelOrForum.id]?.includes(EUserRoles.COMMUNITY_CHANNEL_ADMIN)
      ) {
        this.contextMenuItems.push({
          title: this.message.pinned ? 'Unpin Message' : 'Pin Message',
        });
      }
      if (this.channelsRoles[this.channelOrForum.id]?.includes(EUserRoles.COMMUNITY_CHANNEL_ADMIN)) {
        this.contextMenuItems.push({
          title: 'Email to all members',
        });
      }
      if (
        this.authService.getCurrentUser().id === this.message.user.id ||
        this.channelsRoles[this.channelOrForum.id]?.includes(EUserRoles.COMMUNITY_CHANNEL_ADMIN)
      ) {
        this.contextMenuItems.push({
          title: 'Delete',
        });
      }
      if (this.authService.getCurrentUser().id) {
        this.contextMenuItems.push({
          title: 'Share This Message',
        });
      }
    }
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
    this.editMessageTemplateRef = this.dialogService.open(this.editMessageTemplate);
  }

  togglePinStatus() {
    this.communityChannelManagerService.pinData$.subscribe((data) => {
      if (data) {
        switch (data.action) {
          case 'pin': {
            if (data.user_message.id === this.message.id) {
              this.message.pinned = false;
              const idx = this.contextMenuItems.findIndex((item) => item.title === 'Unpin Message');
              if (idx !== -1) {
                this.contextMenuItems[idx].title = 'Pin Message';
              }
            }
            break;
          }
          case 'unpin': {
            if (data.user_message.id === this.message.id) {
              this.message.pinned = false;
              const idx = this.contextMenuItems.findIndex((item) => item.title === 'Unpin Message');
              if (idx !== -1) {
                this.contextMenuItems[idx].title = 'Pin Message';
              }
            }
            break;
          }
        }
      }
    });
  }

  pinMessage(message: IUserMessage) {
    this.communityChannelsService.pinMessage(message.id, this.channelOrForumId).subscribe(() => {
      this.libToastLogService.successDialog('Pinned Message Successfully!');
      this.communityChannelHandlerService.updatePinnedMessage(message);
      this.message.pinned = true;
      const idx = this.contextMenuItems.findIndex((item) => item.title === 'Pin Message');
      if (idx !== -1) {
        this.contextMenuItems[idx].title = 'Unpin Message';
      }
    });
  }

  unpinMessage(message: IUserMessage) {
    this.communityChannelsService.unpinMessage(message.id, this.channelOrForumId).subscribe(() => {
      this.libToastLogService.successDialog('Unpinned Message Successfully!');
      this.communityChannelHandlerService.removePinnedMessage(message);
      this.message.pinned = false;
      const idx = this.contextMenuItems.findIndex((item) => item.title === 'Unpin Message');
      if (idx !== -1) {
        this.contextMenuItems[idx].title = 'Pin Message';
      }
    });
  }

  sendMessageByEmail(userMessageId) {
    if (window.confirm(`Are you sure you want to send this to all members on their email?`)) {
      this.communityChannelsService.sendMessageByEmail(userMessageId, this.channelOrForumId).subscribe((data) => {
        if (data) {
          this.libToastLogService.successDialog('Emails are being delivered', 1500);
        }
      });
    }
  }

  seoSchema() {
    const shareLink = `${this.environment.app_url}${window.location.pathname}?after=${this.cursor}`;
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'DiscussionForumPosting',
      url: shareLink,
      headline: this.channelOrForum.name,
      text: this.removeHtmlTags(this.message.content),
      author: {
        '@type': 'Person',
        name: this.message.user.name ? this.message.user.name : this.message.user.username,
        url: `https://www.commudle.com/users/${this.message.user.username}`,
      },
      datePublished: this.message.created_at,
      comment: this.getUserMessages(),
    });
  }

  getUserMessages() {
    const resultArray = [];

    for (const userMessage of this.message.user_messages) {
      if (userMessage) {
        const transformedMessage = {
          '@type': 'Comment',
          text: this.removeHtmlTags(userMessage.content),
          author: {
            '@type': 'Person',
            name: userMessage.user.name ? userMessage.user.name : userMessage.user.username,
            url: `https://www.commudle.com/users/${userMessage.user.username}`,
          },
          datePublished: userMessage.created_at,
        };

        resultArray.push(transformedMessage);
      }
    }

    return resultArray;
  }

  removeHtmlTags(content): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    return doc.body.textContent || '';
  }
}
