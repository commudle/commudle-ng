import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventCollaborationCommunitiesService } from 'apps/commudle-admin/src/app/services/event-collaboration-communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEventCollaborationCommunity } from 'apps/shared-models/event_collaboration_community.model';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-collaboration-community',
  templateUrl: './collaboration-community.component.html',
  styleUrls: ['./collaboration-community.component.scss'],
})
export class CollaborationCommunityComponent implements OnInit, OnDestroy {
  eventCollaboration: IEventCollaborationCommunity;
  community: ICommunity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventCollaborationCommunitiesService: EventCollaborationCommunitiesService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => this.confirmCollaboration(data.token));

    this.seoService.setTitle('Confirm Collaboration');
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  confirmCollaboration(token) {
    this.eventCollaborationCommunitiesService.confirmCollaboration(token).subscribe((data) => {
      this.eventCollaboration = data.event_collaboration_community;
      this.community = data.community;
    });
  }
}
