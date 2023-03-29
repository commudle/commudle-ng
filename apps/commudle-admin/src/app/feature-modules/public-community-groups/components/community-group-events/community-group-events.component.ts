import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { IEvent } from 'apps/shared-models/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-group-events',
  templateUrl: './community-group-events.component.html',
  styleUrls: ['./community-group-events.component.scss'],
})
export class CommunityGroupEventsComponent implements OnInit {
  events: IEvent[] = [];

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private communityGroupsService: CommunityGroupsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        console.log(data);
        this.getEvents(data.community_group_id);
      }),
    );
  }

  getEvents(communityGroupId) {
    this.subscriptions.push(
      this.communityGroupsService.pEvents(communityGroupId).subscribe((data) => {
        console.log(data);
        this.events = this.events.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      }),
    );
  }
}
