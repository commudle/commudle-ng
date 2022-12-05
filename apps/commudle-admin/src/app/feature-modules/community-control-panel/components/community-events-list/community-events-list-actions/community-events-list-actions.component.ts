import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'app-community-events-list-actions',
  templateUrl: './community-events-list-actions.component.html',
  styleUrls: ['./community-events-list-actions.component.scss']
})
export class CommunityEventsListActionsComponent implements OnInit {
  @Input() value: string | number;
  @Input() rowData: IEvent;
  constructor() { }

  ngOnInit() {
  }

}
