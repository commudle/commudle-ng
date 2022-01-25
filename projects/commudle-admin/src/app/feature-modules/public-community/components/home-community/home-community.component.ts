import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-home-community',
  templateUrl: './home-community.component.html',
  styleUrls: ['./home-community.component.scss'],
})
export class HomeCommunityComponent implements OnInit {
  community: ICommunity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.seoService.setTags(this.community.name, this.community.mini_description, this.community.logo_path);
    });
  }

  getCommunity(communityId) {
    this.communitiesService.pGetCommunityDetails(communityId).subscribe((data) => {
      this.community = data;
    });
  }
}
