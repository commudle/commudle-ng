import { Component, OnInit } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { faClock, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
import { IEventStatus } from 'projects/shared-models/event_status.model';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss']
})
export class EventDashboardComponent implements OnInit {
  moment = moment;
  EEventStatuses = EEventStatuses;

  faClock = faClock;
  faEdit = faEdit;
  faInfoCircle = faInfoCircle;

  event: IEvent;
  community: ICommunity;


  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private eventsService: EventsService
  ) {}

  ngOnInit() {

    this.activatedRoute.data.subscribe(data => {
      this.event = data.event;

      this.community = data.community;
      this.titleService.setTitle(`${this.event.name} Dashboard | ${this.community.name}`);
    });
  }


  updateEventStatus($event: IEventStatus) {
    this.event.event_status = $event;
  }

  updateRegistrationType(value) {
    this.eventsService.updateCustomRegistration(this.event.id, value).subscribe(
      data => {
        this.event = data;
      }
    );
  }

  updateAgendaType(value) {
    this.eventsService.updateCustomAgenda(this.event.id, value).subscribe(
      data => {
        this.event = data;
      }
    );
  }

}
