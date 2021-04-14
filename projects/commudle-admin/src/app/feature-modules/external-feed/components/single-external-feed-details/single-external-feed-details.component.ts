import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {NbWindowService} from '@nebular/theme';
import {DomSanitizer} from '@angular/platform-browser';
import {ISingleExternalFeed} from 'projects/shared-models/single-external-feed.model';
import {DiscussionsService} from 'projects/commudle-admin/src/app/services/discussions.service';
import {IDiscussion} from 'projects/shared-models/discussion.model';
import { IUserRolesUser } from "projects/shared-models/user_roles_user.model";


@Component({
  selector: 'app-single-extrnal-feed-details',
  templateUrl: './single-extrnal-feed-details.component.html',
  styleUrls: ['./single-extrnal-feed-details.component.scss']
})
export class SingleExtrnalFeedDetailsComponent implements OnInit {

	@ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;
	moment = moment;
	@Input() SEFBuild: ISingleExternalFeed;
	@Input() showComments: boolean;
	discussionChat: IDiscussion;
	teammates: IUserRolesUser[] = [];
	hasIframe = false;
	embedCode: any;
	currImage = null;

	constructor(
		private windowService: NbWindowService,
		private discussionsService: DiscussionsService,
		private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.getDiscussionChat();
		this.teammates = this.SEFBuild.user_roles_users;
		if (this.SEFBuild.link.startsWith('<iframe') && this.SEFBuild.link.endsWith('</iframe>')) {
		  this.embedCode = this.sanitizer.bypassSecurityTrustHtml(this.SEFBuild.link);
		} else {
		  this.embedCode = null;
		}
	}

	openImage(title, image) {
		this.currImage = image;
		this.windowService.open(
		  this.imageTemplate,
		  {
		    title,
		  },
		);
	}

	imageNav(direction) {
		const lenImages = this.SEFBuild.images.length;
		const currentIndex = this.SEFBuild.images.indexOf(this.currImage);
		const nextIndex = (currentIndex + direction + lenImages) % lenImages;
		this.currImage = this.SEFBuild.images[nextIndex];
	}

	getDiscussionChat() {
		this.discussionsService.pGetOrCreateForCommunityBuildChat(this.SEFBuild.id).subscribe(
		  data => this.discussionChat = data
		);
	}

}
