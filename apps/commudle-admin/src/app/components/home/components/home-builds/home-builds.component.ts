import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';

@Component({
  selector: 'app-home-builds',
  templateUrl: './home-builds.component.html',
  styleUrls: ['./home-builds.component.scss'],
})
export class HomeBuildsComponent implements OnInit {
  builds: ICommunityBuild[] = [];

  isBrowser: boolean;

  constructor(private homeService: HomeService, @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.getBuilds();
    }
  }

  getBuilds() {
    this.homeService.communityBuilds().subscribe((value) => (this.builds = value.community_builds.slice(0, 3)));
  }
}
