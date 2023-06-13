import { Component, Input, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';
import { ICommunityBuilds } from 'apps/shared-models/community-builds.model';

@Component({
  selector: 'commudle-featured-projects',
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.scss'],
})
export class FeaturedProjectsComponent implements OnInit {
  communityBuilds: ICommunityBuild[] = [];
  page = 1;
  count = 10;
  total: number;
  isLoading = false;
  canLoadMore = true;
  constructor(private communityBuildsService: CommunityBuildsService) {}

  ngOnInit(): void {
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
