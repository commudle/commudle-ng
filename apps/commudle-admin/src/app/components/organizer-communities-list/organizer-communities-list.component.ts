import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from '../../services/communities.service';
import { ICommunities } from '@commudle/shared-models';
import { ICommunity } from '@commudle/shared-models';

@Component({
  selector: 'commudle-organizer-communities-list',
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
