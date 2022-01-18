import { StatsCommunityBuildsService } from './../../../../services/stats/stats-community-builds.service';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ICommunityBuild, EPublishStatus, EPublishStatusColors } from 'projects/shared-models/community-build.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { NbWindowService } from '@nebular/theme';
import { SeoService } from 'projects/shared-services/seo.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';

@Component({
  selector: 'app-my-community-builds',
  templateUrl: './my-community-builds.component.html',
  styleUrls: ['./my-community-builds.component.scss'],
})
export class MyCommunityBuildsComponent implements OnInit, OnDestroy {
  moment = moment;
  cBuilds: ICommunityBuild[] = [];
  EPublishStatus = EPublishStatus;
  EPublishStatusColors = EPublishStatusColors;
  publishStatuses = Object.keys(EPublishStatus);
  incompleteProfile = false;
  windowRef;

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private seoService : SeoService,
    private toastLogService: LibToastLogService,
    private authWatchService: LibAuthwatchService,
    private appUsersService: AppUsersService,
  ) {}

  ngOnInit() {
    this.setMeta();
    this.getAllBuilds();

    this.authWatchService.currentUser$.subscribe((data) => {
      if (data && !data.profile_completed) {
        this.incompleteProfile = true;
      }
    });
  }

  ngOnDestroy() {
    this.seoService.removeTag("name='robots'");
  }

  setMeta() {
    this.seoService.setTitle('My Builds');
    this.seoService.setTag('robots', 'noindex');
  }

  getAllBuilds() {
    this.appUsersService.myCommunityBuilds().subscribe((data) => {
      this.cBuilds = data.community_builds;
    });
  }

  destroyBuild(buildId) {
    const buildIndex = this.cBuilds.findIndex(k => k.id === buildId);
    this.communityBuildsService.destroy(this.cBuilds[buildIndex].id).subscribe((data) => {
      if (data) {
        this.cBuilds.splice(buildIndex, 1);
        this.toastLogService.successDialog('Deleted');
      }
    });
  }
}
