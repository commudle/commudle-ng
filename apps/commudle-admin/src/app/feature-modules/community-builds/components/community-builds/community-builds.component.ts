import { Component, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';
import { ICommunityBuilds } from 'apps/shared-models/community-builds.model';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-community-builds',
  templateUrl: './community-builds.component.html',
  styleUrls: ['./community-builds.component.scss'],
})
export class CommunityBuildsComponent implements OnInit {
  communityBuilds: ICommunityBuild[] = [];
  page = 1;
  count = 10;
  total: number;
  isLoading = false;
  canLoadMore = true;

  constructor(private communityBuildsService: CommunityBuildsService, private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setTags(
      'Builds - Projects & Side Hustle Sharing Platform for Developers ',
      'Builds are open source and other projects in Web, Android, iOS, AI/ML & more created by software developers. Share a project to get recognition & inspire others.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
    this.getCommunityBuilds();
  }

  getCommunityBuilds() {
    if (!this.isLoading && (!this.total || this.communityBuilds.length < this.total)) {
      this.isLoading = true;
      this.communityBuildsService.pGetAll(this.page, this.count).subscribe((data: ICommunityBuilds) => {
        this.communityBuilds = this.communityBuilds.concat(data.community_builds);
        this.page += 1;
        this.total = data.total;
        this.isLoading = false;
        if (this.communityBuilds.length >= this.total) {
          this.canLoadMore = false;
        }
      });
    }
  }
}
