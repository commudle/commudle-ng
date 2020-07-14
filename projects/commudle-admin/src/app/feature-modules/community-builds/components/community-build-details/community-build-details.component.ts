import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import * as moment from 'moment';
import { NbWindowService } from '@nebular/theme';
import { DomSanitizer } from '@angular/platform-browser';
import { ICommunityBuild, EBuildType, CBuildTypeDisplay } from 'projects/shared-models/community-build.model';
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
  @Input() cBuild: ICommunityBuild;
  @Input() showComments: boolean;
  discussionChat: IDiscussion;

  EBuildType = EBuildType;
  CBuildTypeDisplay = CBuildTypeDisplay;
  hasIframe = false;
  embedCode: any;

  constructor(
    private windowService: NbWindowService,
    private discussionsService: DiscussionsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getDiscussionChat();
    if (this.cBuild.link.startsWith('<iframe') && this.cBuild.link.endsWith('</iframe>')) {
      this.embedCode = this.sanitizer.bypassSecurityTrustHtml(this.cBuild.link);
    } else {
      this.embedCode = null;
    }
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
