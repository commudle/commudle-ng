import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';

@Component({
  selector: 'app-community-build',
  templateUrl: './community-build.component.html',
  styleUrls: ['./community-build.component.scss'],
})
export class CommunityBuildComponent implements OnInit {
  communityBuild: ICommunityBuild;

  constructor(
    private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private communityBuildsService: CommunityBuildsService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.getCommunityBuild(data.community_build_id);
    });
  }

  setMeta() {
    this.title.setTitle(`${this.communityBuild.name} | By ${this.communityBuild.user.name}`);
    this.meta.updateTag({
      name: 'description',
      content: this.communityBuild.description.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    });
    this.meta.updateTag({
      name: 'og:image',
      content: `${
        this.communityBuild.images.length > 0
          ? this.communityBuild.images[0].url
          : 'https://commudle.com/assets/images/commudle-logo192.png'
      }`,
    });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: `${
        this.communityBuild.images.length > 0
          ? this.communityBuild.images[0].url
          : 'https://commudle.com/assets/images/commudle-logo192.png'
      }`,
    });
    this.meta.updateTag({
      name: 'og:title',
      content: `${this.communityBuild.name} | By ${this.communityBuild.user.name}`,
    });
    this.meta.updateTag({
      name: 'og:description',
      content: this.communityBuild.description.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    });
    this.meta.updateTag({ name: 'og:type', content: 'website' });

    this.meta.updateTag({
      name: 'twitter:image',
      content: `${
        this.communityBuild.images.length > 0
          ? this.communityBuild.images[0].url
          : 'https://commudle.com/assets/images/commudle-logo192.png'
      }`,
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: `${this.communityBuild.name} | By ${this.communityBuild.user.name}`,
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: this.communityBuild.description.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    });
  }

  getCommunityBuild(id) {
    this.communityBuildsService.pShow(id).subscribe((data) => {
      this.communityBuild = data;
      this.setMeta();
    });
  }
}
