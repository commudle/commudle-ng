import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDiscussion } from '@commudle/shared-models';
import { SessionPageNotificationsService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-session-page-qna',
  templateUrl: './session-page-qna.component.html',
  styleUrls: ['./session-page-qna.component.scss'],
})
export class SessionPageQnaComponent implements OnInit {
  @Input() qna: IDiscussion;
  @Output() newQna: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sessionPageNotificationsService: SessionPageNotificationsService) {}

  ngOnInit(): void {}

  newQnaNotification(): void {
    this.newQna.emit();
    this.sessionPageNotificationsService.newQna = true;
  }
}
