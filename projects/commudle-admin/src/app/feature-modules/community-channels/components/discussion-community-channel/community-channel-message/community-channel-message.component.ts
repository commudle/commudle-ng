import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NbMenuService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { Match } from 'autolinker';
import * as moment from 'moment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-community-channel-message',
  templateUrl: './community-channel-message.component.html',
  styleUrls: ['./community-channel-message.component.scss'],
})
export class CommunityChannelMessageComponent implements OnInit, OnChanges, OnDestroy {
  EUserRoles = EUserRoles;
  @ViewChild('editMessageTemplate', { static: true }) editMessageTemplate: TemplateRef<any>;

  @Input() message: IUserMessage;
  @Input() canReply: boolean;
  @Input() roles = [];
  @Input() permittedActions;
  @Input() allActions;
  @Input() currentUser: ICurrentUser;
  @Output() sendVote = new EventEmitter();
  @Output() sendReply = new EventEmitter();
  @Output() sendAttachmentReply = new EventEmitter();
  @Output() sendUpdatedReply = new EventEmitter();
  @Output() sendUpdatedAttachmentReply = new EventEmitter();
  @Output() sendFlag = new EventEmitter();
  @Output() sendDelete = new EventEmitter();
  @Output() sendMessageByEmail = new EventEmitter();

  canEdit = false;
  editMode = false;
  isAdmin = false;
  canDelete = false;
  canSendMessageByEmail = false;

  editMessageTemplateRef: NbWindowRef;

  subscriptions: Subscription[] = [];

  moment = moment;

  showReplyForm = false;

  contextMenuItems = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private menuService: NbMenuService,
    private nbWindowService: NbWindowService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());

    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        if (this.currentUser) {
          if (this.roles) {
            this.isAdmin = this.roles.includes(EUserRoles.COMMUNITY_CHANNEL_ADMIN);
          }

          if (!this.canEdit && this.currentUser.username === this.message.user.username) {
            this.canEdit = true;
            this.contextMenuItems.push({
              title: 'Edit',
            });
          }
          if (!this.canDelete && (this.isAdmin || this.currentUser.username === this.message.user.username)) {
            this.canDelete = true;
            this.contextMenuItems.push({
              title: 'Delete',
            });
          }
          if (this.isAdmin && !this.canSendMessageByEmail) {
            this.canSendMessageByEmail = true;
            this.contextMenuItems.push({
              title: 'Email to all members',
            });
          }
        }
      }),
    );

    this.handleContextMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  login(): boolean {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }

  emitVote(userMessageId): void {
    this.sendVote.emit(userMessageId);
  }

  emitDelete(userMessageId): void {
    this.sendDelete.emit(userMessageId);
  }

  emitReply(data): void {
    this.sendReply.emit(data);
  }

  emitAttachmentReply(data): void {
    this.sendAttachmentReply.emit(data);
  }

  emitUpdate(data, userMessageId?: number): void {
    if (userMessageId) {
      this.sendUpdatedReply.emit([data, userMessageId]);
    } else {
      this.sendUpdatedReply.emit(data);
    }
    this.editMessageTemplateRef?.close();
  }

  emitAttachmentUpdate(data): void {
    this.sendUpdatedAttachmentReply.emit(data);
    this.editMessageTemplateRef?.close();
  }

  toggleReplyForm(): void {
    this.showReplyForm = !this.showReplyForm;
  }

  emitSendMessageByEmail(messageId): void {
    this.sendMessageByEmail.emit(messageId);
  }

  handleContextMenu(): void {
    this.subscriptions.push(
      this.menuService
        .onItemClick()
        .pipe(
          filter(({ tag }) => tag === `community-channel-message-menu-${this.message.id}`),
          map(({ item: title }) => title),
        )
        .subscribe((menuItem) => {
          switch (menuItem.title) {
            case 'Edit': {
              this.openEditForm();
              break;
            }
            case 'Delete': {
              this.login() && this.emitDelete(this.message.id);
              break;
            }
            case 'Email to all members': {
              this.sendMessageByEmail.emit(this.message.id);
              break;
            }
          }
        }),
    );
  }

  openEditForm(): void {
    this.editMessageTemplateRef = this.nbWindowService.open(this.editMessageTemplate, {
      title: 'Edit your message',
    });
  }

  highlightUserMentions(match: Match): string {
    switch (match.getType()) {
      case 'mention':
        return `<a href="https://commudle.com/users/${match
          .getMatchedText()
          .slice(1)}" target="_blank">${match.getMatchedText()}</a>`;
    }
  }
}
