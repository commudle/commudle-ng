import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { IEvent } from 'projects/shared-models/event.model';
import { IUser } from 'projects/shared-models/user.model';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-attended-members',
  templateUrl: './attended-members.component.html',
  styleUrls: ['./attended-members.component.scss'],
})
export class AttendedMembersComponent implements OnInit, OnDestroy {
  event: IEvent;
  members: IUser[] = [];
  isLoading = false;

  page = 1;
  count = 10;
  total = 0;
  query: string;
  queryChanged: Subject<string> = new Subject<string>();

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.event = data.event;
        this.getMembers();
      }),
    );

    this.subscriptions.push(
      this.queryChanged.pipe(debounceTime(800), distinctUntilChanged()).subscribe((q) => {
        this.query = q;
        this.search();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMembers(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.eventsService.getAttendedMembers('', this.event.id, this.page, this.count).subscribe((data) => {
        this.members = data.users;
        this.total = data.total;
        this.isLoading = false;
      }),
    );
  }

  search(): void {
    this.page = 1;
    this.getMembers();
  }
}
