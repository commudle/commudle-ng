import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, TemplateRef, OnChanges } from '@angular/core';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import * as moment from 'moment';
import { filter, map } from 'rxjs/operators';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-community-channel-message',
  templateUrl: './community-channel-message.component.html',
  styleUrls: ['./community-channel-message.component.scss']
})
export class CommunityChannelMessageComponent implements OnInit, OnChanges, OnDestroy {
  EUserRoles = EUserRoles;
  @ViewChild('editMessageTemplate', {static: true}) editMessageTemplate: TemplateRef<any>;

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

  subscriptions = [];

  sanitizedContent;

  moment = moment;

  showReplyForm = false;

  contextMenuItems = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private menuService: NbMenuService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
          if (this.currentUser) {
            if (this.roles) {
              this.isAdmin = this.roles.includes(EUserRoles.COMMUNITY_CHANNEL_ADMIN);
            }

            if ((this.currentUser.username === this.message.user.username)) {
              this.canEdit = true;
              // this.contextMenuItems.push({
              //   title: 'Edit'
              // });
            }
            if (!this.canDelete && (this.isAdmin || (this.currentUser.username === this.message.user.username))) {
              this.canDelete = true;
              this.contextMenuItems.push({
                title: 'Delete'
              });
            }

            if (this.isAdmin) {
              this.contextMenuItems.push({
                title: 'Email to all members'
              });
            }
          }
        }
      )
    )


    this.handleContextMenu();
  }

  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


  login() {
    if (!this.currentUser) {
      this.authWatchService.logInUser();
    }
    return true;
  }

  emitVote(userMessageId) {
    this.sendVote.emit(userMessageId);
  }


  emitDelete(userMessageId) {
    this.sendDelete.emit(userMessageId);
  }

  emitReply(data) {
    this.sendReply.emit(data);
  }

  emitAttachmentReply(data) {
    this.sendAttachmentReply.emit(data);
  }


  emitUpdate(data) {
    this.sendUpdatedReply.emit(data);
  }

  emitAttachmentUpdate(data) {
    this.sendUpdatedAttachmentReply.emit(data);
  }

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }

  emitSendMessageByEmail(messageId) {
    this.sendMessageByEmail.emit(messageId);
  }


  handleContextMenu() {
    this.subscriptions.push(
      this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === `community-channel-message-menu-${this.message.id}`),
        map(({item: title}) => title)
      ).subscribe(
        menuItem => {
          switch (menuItem.title) {
            case 'Edit': {
              this.openEditForm();
              break;
            }
            case 'Delete': {
              this.login() && this.emitDelete(this.message.id)
              break;
            }
            case 'Email to all members': {
              this.sendMessageByEmail.emit(this.message.id);
              break;
            }
          }
        }
      )
    );
  }


  openEditForm() {
    // TODO CHANNEL TEST
    // this.dialogService.open(this.editMessageTemplate, {
    //   context: {
    //     title: 'This is a title passed to the dialog component'
    //   }
    // });
  }

}
