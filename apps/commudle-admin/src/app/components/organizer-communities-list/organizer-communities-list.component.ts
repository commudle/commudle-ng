import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from '../../services/communities.service';
import { ICommunities } from 'apps/shared-models/communities.model';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'app-organizer-communities-list',
  templateUrl: './organizer-communities-list.component.html',
  styleUrls: ['./organizer-communities-list.component.scss']
})
export class OrganizerCommunitiesListComponent implements OnInit {
  organizerCommunities: ICommunity[];

  constructor(
    private communitiesService: CommunitiesService
  ) { }

  ngOnInit() {
    // this.communitiesService.getOrganizerCommunities().subscribe(
    //   ((data: ICommunities) => {
    //     this.organizerCommunities = data.communities;
    //   })
    // );
  }

}
