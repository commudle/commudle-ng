import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
  @ViewChild('confirmDeleteTemplate') confirmDeleteTemplate: TemplateRef<any>;
  moment = moment;
  cBuilds: ICommunityBuild[] = [];
  EPublishStatus = EPublishStatus;
  EPublishStatusColors = EPublishStatusColors;
  publishStatuses = Object.keys(EPublishStatus);
  incompleteProfile = false;
  windowRef;

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private title: Title,
    private toastLogService: LibToastLogService,
    private authWatchService: LibAuthwatchService,
    private windowService: NbWindowService
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

  openDeleteConfirmation(cBuild, index) {
    this.windowRef = this.windowService.open(
      this.confirmDeleteTemplate,
      {title: `Are you sure you want to delete ${cBuild.name}?`, context: { name: cBuild.name, index: index } },
    );
  }

  destroyBuild(index) {
    this.communityBuildsService.destroy(this.cBuilds[index].id).subscribe(
      data => {
        if (data) {
          this.cBuilds.splice(index, 1);
          this.windowRef.close();
          this.toastLogService.successDialog('Deleted');
        }
      }
    );
  }

}
