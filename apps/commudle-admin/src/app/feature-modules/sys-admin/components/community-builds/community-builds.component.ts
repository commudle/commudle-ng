import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { EPublishStatus, ICommunityBuild } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-community-builds',
  templateUrl: './community-builds.component.html',
  styleUrls: ['./community-builds.component.scss'],
})
export class CommunityBuildsComponent implements OnInit {
  moment = moment;
  cBuilds: ICommunityBuild[] = [];
  EPublishStatus = EPublishStatus;
  publishStatuses = Object.keys(EPublishStatus);
  total = 0;
  page = 1;
  isLoading = false;

  constructor(private toastLogService: LibToastLogService, private communityBuildsService: CommunityBuildsService) {}

  ngOnInit() {
    this.getAllBuilds();
  }

  getAllBuilds() {
    this.isLoading = true;
    this.communityBuildsService.getAll(this.page).subscribe((data) => {
      this.cBuilds = this.cBuilds.concat(data.community_builds);
      this.total = data.total;
      this.page += 1;
      this.isLoading = false;
    });
  }

  updatePublishStatus(event, communityBuildId) {
    this.communityBuildsService.updatePublishStatus(communityBuildId, event).subscribe(() => {
      this.toastLogService.successDialog(`Status Updated!`);
    });
  }
}
