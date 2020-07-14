import { Component, OnInit } from '@angular/core';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';

@Component({
  selector: 'app-community-build',
  templateUrl: './community-build.component.html',
  styleUrls: ['./community-build.component.scss']
})
export class CommunityBuildComponent implements OnInit {

  communityBuild: ICommunityBuild;
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private communityBuildsService: CommunityBuildsService

  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      data => {
        this.getCommunityBuild(data.community_build_id);
      }
    );
  }

  getCommunityBuild(id) {
    this.communityBuildsService.pShow(id).subscribe(
      data => {
        this.communityBuild = data;
        this.title.setTitle(this.communityBuild.name);
      }
    );
  }

}
