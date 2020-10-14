import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-control-panel',
  templateUrl: './community-control-panel.component.html',
  styleUrls: ['./community-control-panel.component.scss']
})
export class CommunityControlPanelComponent implements OnInit {
  community: ICommunity;

  tabs: any[] = [
    {
      title: 'Events',
      route: `./`
    },
    {
      title: 'Forms',
      route: `./forms`
    },
    {
      title: 'Edit Details',
      route: `./edit`
    },
    {
      title: 'Team',
      route: `./team`
    }
  ];

  constructor(
    private titleService: Title,
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setCommunity();
  }


  setCommunity() {
    this.activatedRoute.params.subscribe(params => {
      let communityId = this.activatedRoute.snapshot.params['name'];
      this.communitiesService.getCommunityDetails(communityId).subscribe(
        data => {
          this.community = data;
        }
      );
    });
  }

  setTitle() {
    this.titleService.setTitle(`${this.community.name} | Community Admin`);
  }

}
