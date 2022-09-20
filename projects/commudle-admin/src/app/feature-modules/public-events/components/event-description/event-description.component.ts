import { Component, OnInit, Input, Output } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { environment } from 'projects/commudle-admin/src/environments/environment';

@Component({
  selector: 'app-event-description',
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
