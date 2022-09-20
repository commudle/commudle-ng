import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@commudle/shared-environments';
import { ICommunity, IEvent } from '@commudle/shared-models';

@Component({
  selector: 'commudle-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Input() share?: boolean;

  environment = environment;

  constructor() {}

  ngOnInit() {}
}
