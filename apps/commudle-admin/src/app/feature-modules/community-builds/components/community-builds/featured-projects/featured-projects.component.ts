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
  featuredProjects: ICommunityBuild[] = [];

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
