import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDiscussion } from '@commudle/shared-models';
import { SessionPageNotificationsService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-session-page-chat',
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
