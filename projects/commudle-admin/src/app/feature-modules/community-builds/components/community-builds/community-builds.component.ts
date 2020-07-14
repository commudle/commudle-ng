import { Component, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-community-builds',
  templateUrl: './community-builds.component.html',
  styleUrls: ['./community-builds.component.scss']
})
export class CommunityBuildsComponent implements OnInit {
  communityBuilds: ICommunityBuild[] = [];
  page = 1;
  count = 10;
  total;
  isLoading = false;
  canLoadMore = true;

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Community Builds');
  }

  setMeta() {
    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({ name: 'og:title', content: `Community Builds | Share What You've Built!` });
    this.meta.updateTag({
      name: 'og:description',
      content: `Project, Slides from a Session, an Online Course, share it all with the community!`
    });
    this.meta.updateTag({ name: 'og:type', content: 'website'});
  }

  ngOnInit() {
    this.setMeta();
    this.getCommunityBuilds();
  }

  getCommunityBuilds() {
    if (!this.isLoading && (!this.total || this.communityBuilds.length < this.total)) {
      this.communityBuildsService.pGetAll(this.page, this.count).subscribe(
        data => {
          this.communityBuilds = this.communityBuilds.concat(data.community_builds);
          this.page += 1;
          this.count += 1;
          this.total = data.total;
          this.isLoading = false;
          if (this.communityBuilds.length >= this.total) {
            this.canLoadMore = false;
          }
        }
      );
    }
  }


}
