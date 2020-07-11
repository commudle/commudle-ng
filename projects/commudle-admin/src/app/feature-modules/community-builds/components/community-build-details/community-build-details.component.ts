import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import * as moment from 'moment';
import { NbWindowService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ICommunityBuild, EBuildType } from 'projects/shared-models/community-build.model';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';

@Component({
  selector: 'app-community-build-details',
  templateUrl: './community-build-details.component.html',
  styleUrls: ['./community-build-details.component.scss']
})
export class CommunityBuildDetailsComponent implements OnInit {
  @ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;

  moment = moment;
  cBuild: ICommunityBuild;
  discussionChat: IDiscussion;

  EBuildType = EBuildType;

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private windowService: NbWindowService,
    private communityBuildsService: CommunityBuildsService,
    private discussionsService: DiscussionsService
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
        this.cBuild = data;
        this.title.setTitle(this.cBuild.name);
        this.getDiscussionChat();
      }
    );
  }


  openImage(title, url) {
    this.windowService.open(
      this.imageTemplate,
      { title,
        context: {
          imageUrl: url
        }
      },
    );
  }

  getDiscussionChat() {
    this.discussionsService.pGetOrCreateForCommunityBuildChat(this.cBuild.id).subscribe(
      data => this.discussionChat = data
    );
  }

}
