import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { IEvent } from 'projects/shared-models/event.model';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attended-members',
  templateUrl: './attended-members.component.html',
  styleUrls: ['./attended-members.component.scss'],
})
export class AttendedMembersComponent implements OnInit, OnDestroy {
  event: IEvent;
  members: IUser[] = [];
  isVisible: boolean = true;

  page = 1;
  count = 24;
  canLoadMore = true;

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.event = data.event;
        if (this.event) {
          this.getMembers();
        } else {
          this.isVisible = false;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMembers(): void {
    if (this.canLoadMore) {
      this.canLoadMore = false;
      this.subscriptions.push(
        this.eventsService.getAttendedMembers(this.event.id, this.page, this.count).subscribe((data) => {
          this.members = [...this.members, ...data.users];
          if (this.members.length >= data.total) {
            this.canLoadMore = false;
          } else {
            this.page += 1;
            this.canLoadMore = true;
          }
        }),
      );
    }
  }
}
