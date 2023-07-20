import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ICommunity } from '@commudle/shared-models';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';

@Component({
  selector: 'commudle-event-agenda',
  templateUrl: './event-agenda.component.html',
  styleUrls: ['./event-agenda.component.scss'],
})
export class EventAgendaComponent implements OnInit {
  event: IEvent;
  community: ICommunity;
  constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.community = data.community;
      this.event = data.event;
    });
  }
  updateAgendaType(value) {
    this.eventsService.updateCustomAgenda(this.event.id, value).subscribe((data) => {
      this.event = data;
    });
  }
}
