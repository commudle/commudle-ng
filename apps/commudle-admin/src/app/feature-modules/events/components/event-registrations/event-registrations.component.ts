import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ICommunity } from '@commudle/shared-models';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';

@Component({
  selector: 'commudle-event-registrations',
  templateUrl: './event-registrations.component.html',
  styleUrls: ['./event-registrations.component.scss'],
})
export class EventRegistrationsComponent implements OnInit {
  event: IEvent;
  community: ICommunity;
  constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.community = data.community;
      this.event = data.event;
    });
  }

  updateRegistrationType(value) {
    this.eventsService.updateCustomRegistration(this.event.id, value).subscribe((data) => {
      this.event = data;
    });
  }
}
