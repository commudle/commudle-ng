import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ICommunityBuild, EPublishStatus, EPublishStatusColors } from 'projects/shared-models/community-build.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { NbWindowService } from '@nebular/theme';
import { Title } from '@angular/platform-browser';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-my-community-builds',
  templateUrl: './my-community-builds.component.html',
  styleUrls: ['./my-community-builds.component.scss']
})
export class MyCommunityBuildsComponent implements OnInit {
  moment = moment;
  cBuilds: ICommunityBuild[] = [];
  EPublishStatus = EPublishStatus;
  EPublishStatusColors = EPublishStatusColors;
  publishStatuses = Object.keys(EPublishStatus);
  incompleteProfile = false;

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private title: Title,
    private toastLogService: LibToastLogService,
    private authWatchService: LibAuthwatchService
  ) {
    title.setTitle('My Builds');
   }

  ngOnInit() {
    this.getAllBuilds();

    this.authWatchService.currentUser$.subscribe(
      data => {
        if (!data.profile_completed) {
          this.incompleteProfile = true;
        }
      }
    );
  }


  getAllBuilds() {
    this.communityBuildsService.getAll().subscribe(
      data => {
        this.cBuilds = data.community_builds;
      }
    );
  }


  destroyBuild(index) {
    this.communityBuildsService.destroy(this.cBuilds[index].id).subscribe(
      data => {
        if (data) {
          this.cBuilds.splice(index, 1);
          this.toastLogService.successDialog('Deleted');
        }
      }
    );
  }

}
