import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import * as moment from 'moment';
import { NbWindowService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
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
  hasIframe = false;
  embedCode: any;

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private windowService: NbWindowService,
    private communityBuildsService: CommunityBuildsService,
    private discussionsService: DiscussionsService,
    private sanitizer: DomSanitizer
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
        if (this.cBuild.link.startsWith('<iframe') && this.cBuild.link.endsWith('</iframe>')) {
          this.embedCode = this.sanitizer.bypassSecurityTrustHtml(this.cBuild.link);
        } else {
          this.embedCode = null;
        }
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
