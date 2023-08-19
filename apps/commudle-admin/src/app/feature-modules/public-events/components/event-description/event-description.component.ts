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

  viewMoreSection = true;
  footerText = 'View More';
  descriptionTextHeight: number;
  environment = environment;

  constructor() {}

  ngOnInit() {
    // this.descriptionTextHeight = document.querySelector('nb-card-body').clientHeight;
    // this.viewMoreSection = this.descriptionTextHeight > 200;
  }

  viewMore() {
    this.viewMoreSection = !this.viewMoreSection;
    if (!this.viewMoreSection) {
      this.footerText = `View Less`;
    } else {
      this.footerText = `View More`;
    }
  }
}
