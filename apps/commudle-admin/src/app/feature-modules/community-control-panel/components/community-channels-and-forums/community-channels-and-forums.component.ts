import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity, EDbModels } from '@commudle/shared-models';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';

@Component({
  selector: 'commudle-community-channels-and-forums',
  templateUrl: './community-channels-and-forums.component.html',
  styleUrls: ['./community-channels-and-forums.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommunityChannelsAndForumsComponent implements OnInit {
  community: ICommunity;
  EDbModels = EDbModels;
  constructor(private activatedRoute: ActivatedRoute, private communitiesService: CommunitiesService) {}

  ngOnInit() {
    this.communitiesService
      .getCommunityDetails(this.activatedRoute.parent.snapshot.params['community_id'])
      .subscribe((data) => {
        this.community = data;
      });
  }
}
