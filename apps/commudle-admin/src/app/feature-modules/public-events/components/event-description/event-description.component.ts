import { Component, OnInit, Input, Output } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { environment } from 'apps/commudle-admin/src/environments/environment';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  @Input() share?: boolean;

  footerText = 'View More';
  showFullDescription = false;
  environment = environment;

  constructor() {}

  ngOnInit() {}

  viewMore() {
    this.showFullDescription = !this.showFullDescription;
    if (!this.showFullDescription) {
      this.footerText = `View Less`;
    } else {
      this.footerText = `View More`;
    }
  }
}
