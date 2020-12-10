import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import * as moment from 'moment';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { SendMessageFormComponent } from '../send-message-form/send-message-form.component';

@Component({
  selector: 'app-community-channel-message',
  templateUrl: './community-channel-message.component.html',
  styleUrls: ['./community-channel-message.component.scss']
})
export class CommunityChannelMessageComponent implements OnInit, OnDestroy {
  @ViewChild('editMessageTemplate', {static: true}) editMessageTemplate: TemplateRef<any>;

  @Input() message: IUserMessage;
  @Input() canReply: boolean;
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

  canEdit = false;
  editMode = false;

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
    this.authWatchService.currentUser$.subscribe(
      data => {
        this.currentUser = data;
        if (this.currentUser && this.currentUser.username === this.message.user.username) {
          this.canEdit = true;
          // this.contextMenuItems.push({
          //   title: 'Edit'
          // });
          this.contextMenuItems.push({
            title: 'Delete'
          });
        }
      }
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
