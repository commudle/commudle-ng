import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { IEvent } from 'apps/shared-models/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  events: IEvent[] = [];
  subscriptions: Subscription[] = [];

  isLoading = true;

  constructor(private activatedRoute: ActivatedRoute, private communityGroupsService: CommunityGroupsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.getEvents(data.community_group_id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getEvents(slug) {
    this.subscriptions.push(
      this.communityGroupsService.events(slug).subscribe((data) => {
        this.events = this.events.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.isLoading = false;
      }),
    );
  }
}
