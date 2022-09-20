import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommunity, IEvent, IUser } from '@commudle/shared-models';
import { EventsService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasVolunteers = new EventEmitter();

  volunteers: IUser[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.getVolunteers();
  }

  getVolunteers() {
    this.eventsService.pGetEventVolunteers(this.event.id).subscribe((data) => {
      this.volunteers = data.users;
      if (this.volunteers.length > 0) {
        this.hasVolunteers.emit(true);
      }
    });
  }
}
