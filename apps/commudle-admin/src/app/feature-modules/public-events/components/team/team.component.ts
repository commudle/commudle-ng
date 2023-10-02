import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IUser } from 'apps/shared-models/user.model';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { Subscription } from 'rxjs';
import { IPageInfo } from '@commudle/shared-models';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit, OnDestroy {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  volunteers: IUser[] = [];
  isLoading = true;

  pageInfo: IPageInfo;
  count = 6;

  subscriptions: Subscription[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.getVolunteers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getVolunteers() {
    this.subscriptions.push(
      this.eventsService
        .pGetEventVolunteers(this.event.slug, this.count, this.pageInfo?.end_cursor)
        .subscribe((data) => {
          this.volunteers = this.volunteers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.pageInfo = data.page_info;
          this.isLoading = false;
        }),
    );
  }
}
