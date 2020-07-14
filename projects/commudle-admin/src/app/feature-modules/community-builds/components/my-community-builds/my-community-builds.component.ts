import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ICommunityBuild, EPublishStatus, EPublishStatusColors } from 'projects/shared-models/community-build.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { NbWindowService } from '@nebular/theme';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-community-builds',
  templateUrl: './my-community-builds.component.html',
  styleUrls: ['./my-community-builds.component.scss']
})
export class MyCommunityBuildsComponent implements OnInit {
  moment = moment;
  cBuilds: ICommunityBuild[];
  EPublishStatus = EPublishStatus;
  EPublishStatusColors = EPublishStatusColors;
  publishStatuses = Object.keys(EPublishStatus);

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private title: Title
  ) {
    title.setTitle('My Builds');
   }

  ngOnInit() {
    this.getAllBuilds();
  }


  getAllBuilds() {
    this.communityBuildsService.getAll().subscribe(
      data => {
        this.cBuilds = data.community_builds;
      }
    );
  }

}
