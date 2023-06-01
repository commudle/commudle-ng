import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventStatus } from 'apps/shared-models/event_status.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';

@Component({
  selector: 'app-user-past-event-card',
  templateUrl: './user-past-event-card.component.html',
  styleUrls: ['./user-past-event-card.component.scss'],
})
export class UserPastEventCardComponent implements OnInit {
  @Input() pastEvent: IEvent;
  event_status: IEventStatus;

  constructor() {}

  ngOnInit(): void {}
}
