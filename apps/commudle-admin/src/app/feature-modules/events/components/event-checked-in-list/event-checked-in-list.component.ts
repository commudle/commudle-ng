import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IUser } from '@commudle/shared-models';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'commudle-event-checked-in-list',
  templateUrl: './event-checked-in-list.component.html',
  styleUrls: ['./event-checked-in-list.component.scss'],
})
export class EventCheckedInListComponent implements OnInit, OnDestroy {
  event: IEvent;
  page = 1;
  count = 10;
  query = '';
  total = 0;
  members: IUser[] = [];
  subscriptions: Subscription[] = [];
  searchForm;

  constructor(private activatedRoute: ActivatedRoute, private eventsService: EventsService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe((value) => {
      this.event = value.event;
      this.getMembers();
    });
    this.search();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMembers() {
    this.subscriptions.push(
      this.eventsService.getAttendedMembers(this.page, this.count, this.event.id, this.query).subscribe((data) => {
        this.members = data.users;
        console.log(
          '🚀 ~ file: event-checked-in-list.component.ts:38 ~ EventCheckedInListComponent ~ this.eventsService.getAttendedMembers ~  this.members:',
          this.members,
        );
        this.total = data.total;
      }),
    );
  }

  search(): void {
    this.query = '';
    this.searchForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(() => {
      this.members = [];
      // this.pageInfo = null;
      this.query = this.searchForm.get('name').value;
      this.getMembers();
      // this.generateParams(this.employee, this.employer, this.query);
    });
    this.page = 1;
  }
}
