import { Component, OnInit } from '@angular/core';
import { HomeService } from 'projects/commudle-admin/src/app/services/home.service';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';

@Component({
  selector: 'app-homepage-builds',
  templateUrl: './homepage-builds.component.html',
  styleUrls: ['./homepage-builds.component.scss'],
})
export class HomepageBuildsComponent implements OnInit {
  builds: ICommunityBuild[] = [];

  constructor(private homeService: HomeService, private isBrowserService: IsBrowserService) {}

  ngOnInit(): void {
    if (this.isBrowserService.isBrowser()) {
      this.getBuilds();
    }
  }

  getBuilds(): void {
    this.homeService.communityBuilds().subscribe((value) => (this.builds = value.community_builds.slice(0, 3)));
  }

  getDescription(build: ICommunityBuild): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = build.description;
    const htmlContent = txt.value;
    return htmlContent.replace(/<[^>]+>/g, '');
  }
}
