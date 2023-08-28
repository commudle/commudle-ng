import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'commudle-events-agenda',
  templateUrl: './events-agenda.component.html',
  styleUrls: ['./events-agenda.component.scss'],
})
export class EventsAgendaComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  constructor() {}

  ngOnInit(): void {}
}
