import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

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
    private title: Title,
    private meta: Meta
  ) { }

  setMeta() {
    this.meta.updateTag({ name: 'og:image', content: this.community.logo_path });
    this.meta.updateTag({ name: 'og:title', content: this.community.name });
    this.meta.updateTag({ name: 'og:description', content: this.community.mini_description});
    this.meta.updateTag({ name: 'og:type', content: 'profile'});
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.community = data.community;
      this.title.setTitle(`${this.community.name}`);
      this.setMeta();
    });
  }

  getCommunity(communityId) {
    this.communitiesService.pGetCommunityDetails(communityId).subscribe(
      data => {
        this.community = data;
      }
    );
  }

}
