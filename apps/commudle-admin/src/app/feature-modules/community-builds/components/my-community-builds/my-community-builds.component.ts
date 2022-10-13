import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICommunityBuild } from '@commudle/shared-models';
import { AppUsersService, LibAuthwatchService, LibToastLogService, SeoService } from '@commudle/shared-services';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import * as moment from 'moment';

@Component({
  selector: 'commudle-my-community-builds',
  templateUrl: './my-community-builds.component.html',
  styleUrls: ['./my-community-builds.component.scss'],
})
export class MyCommunityBuildsComponent implements OnInit, OnDestroy {
  moment = moment;
  cBuilds: ICommunityBuild[] = [];
  incompleteProfile = false;

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private seoService: SeoService,
    private toastLogService: LibToastLogService,
    private authWatchService: LibAuthwatchService,
    private appUsersService: AppUsersService,
  ) {}

  ngOnInit() {
    this.seoService.setTitle('My Community Builds');
    this.seoService.noIndex(true);
    this.getAllBuilds();

    this.authWatchService.currentUser$.subscribe((data) => {
      if (data && !data.profile_completed) {
        this.incompleteProfile = true;
      }
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  getAllBuilds() {
    this.appUsersService.myCommunityBuilds().subscribe((data) => {
      this.cBuilds = data.community_builds;
    });
  }

  destroyBuild(buildId) {
    const buildIndex = this.cBuilds.findIndex((k) => k.id === buildId);
    this.communityBuildsService.destroy(this.cBuilds[buildIndex].id).subscribe((data) => {
      if (data) {
        this.cBuilds.splice(buildIndex, 1);
        this.toastLogService.successDialog('Deleted');
      }
    });
  }
}
