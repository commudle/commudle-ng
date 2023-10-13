import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ICommunity } from '@commudle/shared-models';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'commudle-event-registrations',
  templateUrl: './event-registrations.component.html',
  styleUrls: ['./event-registrations.component.scss'],
})
export class EventRegistrationsComponent implements OnInit {
  event: IEvent;
  community: ICommunity;
  showDiscountComponent = false;
  icons = {
    faArrowRight,
    faCalendar,
  };
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
