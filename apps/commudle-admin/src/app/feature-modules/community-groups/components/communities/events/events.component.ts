import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'commudle-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: IEvent[] = [];
  isLoading = true;

  constructor(private activatedRoute: ActivatedRoute, private communityGroupsService: CommunityGroupsService) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((data) => {
      this.getEvents(data.community_group_id);
    });
  }

  getEvents(slug) {
    this.communityGroupsService.events(slug).subscribe((data) => {
      this.events = this.events.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.isLoading = false;
    });
  }
}
