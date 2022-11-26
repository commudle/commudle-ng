import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IUser } from 'apps/shared-models/user.model';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasVolunteers = new EventEmitter();

  volunteers: IUser[] = [];

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.getVolunteers();
  }

  getVolunteers() {
    this.eventsService.pGetEventVolunteers(this.event.id).subscribe(
      data => {
        this.volunteers = data.users;
        if (this.volunteers.length > 0) {
          this.hasVolunteers.emit(true);
        }
      }
    );
  }

}
