import { NbWindowService } from '@nebular/theme';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild, EPublishStatus, EPublishStatusColors } from 'projects/shared-models/community-build.model';
import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { StatsCommunityBuildsService } from 'projects/commudle-admin/src/app/services/stats/stats-community-builds.service';


@Component({
  selector: 'app-build-list-item',
  templateUrl: './build-list-item.component.html',
  styleUrls: ['./build-list-item.component.scss']
})
export class BuildListItemComponent implements OnInit {
  @ViewChild('confirmDeleteTemplate') confirmDeleteTemplate: TemplateRef<any>;

  @Input() cb: ICommunityBuild;
  @Output() deleteBuild = new EventEmitter();
  EPublishStatus = EPublishStatus;
  EPublishStatusColors = EPublishStatusColors;
  moment = moment;
  windowRef;
  stats;

  constructor(
    private communityBuildsService: CommunityBuildsService,
    private windowService: NbWindowService,
    private statsCommunityBuildsService: StatsCommunityBuildsService
  ) { }

  ngOnInit() {
    this.getStats();
  }

  openDeleteConfirmation(cBuild) {
    this.windowRef = this.windowService.open(
      this.confirmDeleteTemplate,
      {title: `Are you sure you want to delete ${cBuild.name}?`, context: { cb: cBuild } },
    );
  }

  destroyBuild(buildId) {
    this.deleteBuild.emit(buildId);
    this.windowRef.close()
  }

  getStats() {
    this.statsCommunityBuildsService.userEngagement(this.cb.id).subscribe(
      data => {
        this.stats = data;
      }
    );
  }



}
