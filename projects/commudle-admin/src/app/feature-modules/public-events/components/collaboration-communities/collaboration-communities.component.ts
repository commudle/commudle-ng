import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventCollaborationCommunitiesService } from 'projects/commudle-admin/src/app/services/event-collaboration-communities.service';
import { IEventCollaborationCommunity } from 'projects/shared-models/event_collaboration_community.model';

@Component({
  selector: 'app-collaboration-communities',
  templateUrl: './collaboration-communities.component.html',
  styleUrls: ['./collaboration-communities.component.scss']
})
export class CollaborationCommunitiesComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasCollaborationCommunities = new EventEmitter();

  collaborationCommunities: IEventCollaborationCommunity[] = [];

  constructor(
    private eventCollaborationCommunitiesService: EventCollaborationCommunitiesService
  ) { }

  ngOnInit() {
    this.getCollaborations();
  }


  getCollaborations() {
    this.eventCollaborationCommunitiesService.pGet(this.event.id).subscribe(
      data => {
        this.collaborationCommunities = data.event_collaboration_communities;
        if (this.collaborationCommunities.length > 0) {
          this.hasCollaborationCommunities.emit(true);
        }
      }
    );
  }

}
