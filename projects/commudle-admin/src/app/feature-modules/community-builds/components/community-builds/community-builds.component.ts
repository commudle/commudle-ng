import { Component, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';
import { ICommunityBuilds } from 'projects/shared-models/community-builds.model';

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

  constructor(private communityBuildsService: CommunityBuildsService, private seoService : SeoService) {}

  ngOnInit() {
    this.setMeta();
    this.getCommunityBuilds();
  }

  setMeta() {
    this.seoService.setTags(
      'Builds - Projects Shared by Developers',
      'Builds are open source and other projects in Web, Android, iOS, AI/ML & more created by software developers. Share a project to get recognition & inspire others.',
      'https://commudle.com/assets/images/commudle-logo192.png'
    );
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
