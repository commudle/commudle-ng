import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IFeedItem} from 'projects/shared-models/feed-item.model';
import {DiscussionsService} from 'projects/commudle-admin/src/app/services/discussions.service';
import {IDiscussion} from 'projects/shared-models/discussion.model';

@Component({
  selector: 'app-feed-item-details',
  templateUrl: './feed-item-details.component.html',
  styleUrls: ['./feed-item-details.component.scss']
})
export class FeedItemDetailsComponent implements OnInit {


	@Input() feedItem: IFeedItem;
	discussionChat: IDiscussion;

	currImage = null;
	messagesCount: number;

	constructor(
		private discussionsService: DiscussionsService
    ) { }

	ngOnInit() {
		this.getDiscussionChat();
	}

	getDiscussionChat() {
		this.discussionsService.pGetOrCreateForFeedItemChat(this.feedItem.id).subscribe(
			data => this.discussionChat=data);
	}



}
