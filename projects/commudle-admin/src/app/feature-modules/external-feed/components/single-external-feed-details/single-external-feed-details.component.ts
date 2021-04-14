import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {NbWindowService} from '@nebular/theme';
import {DomSanitizer} from '@angular/platform-browser';
import {ISingleExternalFeed} from 'projects/shared-models/single-external-feed.model';
import {DiscussionsService} from 'projects/commudle-admin/src/app/services/discussions.service';
import {IDiscussion} from 'projects/shared-models/discussion.model';
import { IUserRolesUser } from "projects/shared-models/user_roles_user.model";


@Component({
  selector: 'app-single-external-feed-details',
  templateUrl: './single-external-feed-details.component.html',
  styleUrls: ['./single-external-feed-details.component.scss']
})
export class SingleExtrnalFeedDetailsComponent implements OnInit {

	@ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;
	moment = moment;
	@Input() feedPost: ISingleExternalFeed;
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
		if (this.feedPost.link.startsWith('<iframe') && this.feedPost.link.endsWith('</iframe>')) {
		  this.embedCode = this.sanitizer.bypassSecurityTrustHtml(this.feedPost.link);
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

	getDiscussionChat() {
		this.discussionsService.pGetOrCreateForCommunityBuildChat(this.feedPost.id).subscribe(
		  data => this.discussionChat = data
		);
	}

}
