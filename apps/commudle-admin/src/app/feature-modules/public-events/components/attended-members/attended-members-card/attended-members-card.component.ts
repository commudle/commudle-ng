import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IUser } from '@commudle/shared-models';
import { EventsService, UserChatsService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-attended-members-card',
  templateUrl: './attended-members-card.component.html',
  styleUrls: ['./attended-members-card.component.scss'],
})
export class AttendedMembersCardComponent implements OnInit {
  @Input() user: IUser;

  events: IEvent[] = [];
  showMore = false;

  constructor(
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private userChatsService: UserChatsService,
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsService.getCommonEvents(this.user.id).subscribe((data) => {
      this.events = data.filter((event) => event.slug !== this.activatedRoute.snapshot.params.event_id);
    });
  }

  openChatWithUser(): void {
    this.userChatsService.changeFollowerId(this.user.id);
  }
}
