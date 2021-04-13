import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventCollaborationCommunitiesService } from 'projects/commudle-admin/src/app/services/event-collaboration-communities.service';
import { ActivatedRoute } from '@angular/router';
import { IEventCollaborationCommunity } from 'projects/shared-models/event_collaboration_community.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-collaboration-community',
  templateUrl: './collaboration-community.component.html',
  styleUrls: ['./collaboration-community.component.scss']
})
export class CollaborationCommunityComponent implements OnInit, OnDestroy {

  eventCollaboration: IEventCollaborationCommunity;
  community: ICommunity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventCollaborationCommunitiesService: EventCollaborationCommunitiesService,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      data => {
        this.confirmCollaboration(data.token);
      }
    );

    this.title.setTitle('Confirm Collaboration');
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
  }

  ngOnDestroy() {
    this.meta.removeTag("name='robots'");
  }


  confirmCollaboration(token) {
    this.eventCollaborationCommunitiesService.confirmCollaboration(token).subscribe(
      data => {
        this.eventCollaboration = data.event_collaboration_community;
        this.community = data.community;
      }
    );
  }

}
