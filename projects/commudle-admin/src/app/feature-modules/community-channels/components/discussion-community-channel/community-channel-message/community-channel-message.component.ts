import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import * as moment from 'moment';

@Component({
  selector: 'app-community-channel-message',
  templateUrl: './community-channel-message.component.html',
  styleUrls: ['./community-channel-message.component.scss']
})
export class CommunityChannelMessageComponent implements OnInit {
  @Input() message: IUserMessage;
  @Input() canReply: boolean;
  @Input() permittedActions;
  @Input() allActions;
  @Input() currentUser: ICurrentUser;
  @Output() sendVote = new EventEmitter();
  @Output() sendReply = new EventEmitter();
  @Output() sendFlag = new EventEmitter();
  @Output() sendDelete = new EventEmitter();

  moment = moment;

  showReplyForm = false;


  constructor(
    private authWatchService: LibAuthwatchService,
  ) { }

  ngOnInit() {
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

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }

}
