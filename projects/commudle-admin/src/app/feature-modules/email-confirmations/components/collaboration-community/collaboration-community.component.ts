import { Component, OnInit } from '@angular/core';
import { EventCollaborationCommunitiesService } from 'projects/commudle-admin/src/app/services/event-collaboration-communities.service';
import { ActivatedRoute } from '@angular/router';
import { IEventCollaborationCommunity } from 'projects/shared-models/event_collaboration_community.model';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-collaboration-community',
  templateUrl: './collaboration-community.component.html',
  styleUrls: ['./collaboration-community.component.scss']
})
export class CollaborationCommunityComponent implements OnInit {

  eventCollaboration: IEventCollaborationCommunity;
  community: ICommunity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventCollaborationCommunitiesService: EventCollaborationCommunitiesService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      data => {
        this.confirmCollaboration(data.token);
      }
    );
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
