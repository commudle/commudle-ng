import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  total;
  isLoading = false;
  canLoadMore = true;

  constructor(private communityBuildsService: CommunityBuildsService, private title: Title, private meta: Meta) {}

  ngOnInit() {
    this.setMeta();
    this.getCommunityBuilds();
  }

  setMeta() {
    this.title.setTitle('Builds - Projects Shared by Developers');
    this.meta.updateTag({
      name: 'description',
      content: `Builds are open source and other projects in Web, Android, iOS, AI/ML & more created by software developers. Share a project to get recognition & inspire others.`,
    });

    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: 'https://commudle.com/assets/images/commudle-logo192.png',
    });
    this.meta.updateTag({ name: 'og:title', content: `Builds - Projects Shared by Developers` });
    this.meta.updateTag({
      name: 'og:description',
      content: `Builds are open source and other projects in Web, Android, iOS, AI/ML & more created by software developers. Share a project to get recognition & inspire others.`,
    });
    this.meta.updateTag({ name: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `Builds - Projects Shared by Developers` });
    this.meta.updateTag({
      name: 'twitter:description',
      content: `Builds are open source and other projects in Web, Android, iOS, AI/ML & more created by software developers. Share a project to get recognition & inspire others.`,
    });
  }

  getCommunityBuilds() {
    if (!this.isLoading && (!this.total || this.communityBuilds.length < this.total)) {
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
