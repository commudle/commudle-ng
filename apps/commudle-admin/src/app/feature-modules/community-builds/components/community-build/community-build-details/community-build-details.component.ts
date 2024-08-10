import { Component, Input, OnInit, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@commudle/theme';
import * as moment from 'moment';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { CBuildTypeDisplay, EBuildType, ICommunityBuild } from 'apps/shared-models/community-build.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-community-build-details',
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
  singleImage: boolean;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  moment = moment;

  environment = environment;

  @ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;

  constructor(
    private dialogService: NbDialogService,
    private discussionsService: DiscussionsService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.getDiscussionChat();
    this.teammates = this.cBuild.user_roles_users;
    if (this.cBuild.video_iframe?.startsWith('<iframe') && this.cBuild.video_iframe?.endsWith('</iframe>')) {
      this.embedCode = this.sanitizer.bypassSecurityTrustHtml(this.cBuild.video_iframe);
    } else {
      this.embedCode = null;
    }
    this.isSingleImage();
  }

  openImage(image) {
    this.currImage = image;
    this.dialogService.open(this.imageTemplate, {});
  }

  imageNav(direction) {
    const lenImages = this.cBuild.images.length;
    const currentIndex = this.cBuild.images.indexOf(this.currImage);
    const nextIndex = (currentIndex + direction + lenImages) % lenImages;
    this.currImage = this.cBuild.images[nextIndex];
  }

  getDiscussionChat() {
    this.discussionsService.pGetOrCreateForCommunityBuildChat(this.cBuild.id).subscribe((data) => {
      this.discussionChat = data;
    });
  }

  isSingleImage() {
    this.singleImage = this.cBuild.images.length === 1;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event) {
    if (event.key === 'ArrowLeft') {
      this.imageNav(-1);
    } else if (event.key === 'ArrowRight') {
      this.imageNav(1);
    }
  }
}
