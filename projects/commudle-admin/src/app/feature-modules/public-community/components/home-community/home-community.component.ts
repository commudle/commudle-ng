import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-community',
  templateUrl: './home-community.component.html',
  styleUrls: ['./home-community.component.scss']
})
export class HomeCommunityComponent implements OnInit {
  community: ICommunity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private title: Title
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getCommunity(params.community_id);
    });
  }

  getCommunity(communityId) {
    this.communitiesService.pGetCommunityDetails(communityId).subscribe(
      data => {
        this.community = data;
        this.title.setTitle(`${this.community.name}`)
      }
    );
  }

}
