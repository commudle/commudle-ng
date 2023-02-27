import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { SessionPageNotificationsService } from 'apps/shared-services/session-page-notifications.service';

@Component({
  selector: 'app-session-page-chat',
  templateUrl: './session-page-chat.component.html',
  styleUrls: ['./session-page-chat.component.scss'],
})
export class SessionPageChatComponent implements OnInit {
  @Input() chat: IDiscussion;
  @Output() newMessage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sessionPageNotificationsService: SessionPageNotificationsService) {}

  ngOnInit(): void {}

  newMessageNotification(): void {
    this.newMessage.emit();
    this.sessionPageNotificationsService.newChat = true;
  }
}
