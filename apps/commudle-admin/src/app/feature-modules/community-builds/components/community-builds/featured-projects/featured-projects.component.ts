import { Component, Input, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-featured-projects',
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.scss'],
})
export class FeaturedProjectsComponent implements OnInit {
  featuredProjects: IFeaturedItems[] = [];
  staticAssets = staticAssets;

  constructor(private communityBuildsService: CommunityBuildsService) {}

  ngOnInit(): void {
    this.getFeaturedProjects();
  }

  getFeaturedProjects() {
    this.communityBuildsService.pGetFeaturedProjects('CommunityBuild').subscribe((data) => {
      this.featuredProjects = this.featuredProjects.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
    });
  }
}
