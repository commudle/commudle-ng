import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@commudle/shared-environments';
import { CBuildTypeDisplay, EBuildType, ICommunityBuild, IDiscussion, IUserRolesUser } from '@commudle/shared-models';
import { NbWindowService } from '@nebular/theme';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import * as moment from 'moment';

@Component({
  selector: 'commudle-community-build-details',
  templateUrl: './community-build-details.component.html',
  styleUrls: ['./community-build-details.component.scss'],
})
export class CommunityBuildDetailsComponent implements OnInit {
  @Input() cBuild: ICommunityBuild;

  discussionChat: IDiscussion;
  teammates: IUserRolesUser[] = [];
  EBuildType = EBuildType;
  CBuildTypeDisplay = CBuildTypeDisplay;
  hasIframe = false;
  embedCode: any;
  currImage = null;

  moment = moment;

  environment = environment;

  @ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;

  constructor(
    private windowService: NbWindowService,
    private discussionsService: DiscussionsService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.getDiscussionChat();
    this.teammates = this.cBuild.user_roles_users;
    if (this.cBuild.video_iframe.startsWith('<iframe') && this.cBuild.video_iframe.endsWith('</iframe>')) {
      this.embedCode = this.sanitizer.bypassSecurityTrustHtml(this.cBuild.video_iframe);
    } else {
      this.embedCode = null;
    }
  }

  openImage(title, image) {
    this.currImage = image;
    this.windowService.open(this.imageTemplate, {
      title,
    });
  }

  imageNav(direction) {
    const lenImages = this.cBuild.images.length;
    const currentIndex = this.cBuild.images.indexOf(this.currImage);
    const nextIndex = (currentIndex + direction + lenImages) % lenImages;
    this.currImage = this.cBuild.images[nextIndex];
  }

  getDiscussionChat() {
    this.discussionsService
      .pGetOrCreateForCommunityBuildChat(this.cBuild.id)
      .subscribe((data) => (this.discussionChat = data));
  }
}
