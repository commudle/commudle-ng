import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {NbWindowService, NbDialogService, NbSidebarService} from '@nebular/theme';
import {DomSanitizer} from '@angular/platform-browser';
import {IFeedItem} from 'projects/shared-models/feed-item.model';
import {DiscussionsService} from 'projects/commudle-admin/src/app/services/discussions.service';
import {IDiscussion} from 'projects/shared-models/discussion.model';
import {FooterService} from 'projects/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'app-feed-item-details',
  templateUrl: './feed-item-details.component.html',
  styleUrls: ['./feed-item-details.component.scss']
})
export class FeedItemDetailsComponent implements OnInit {

	@ViewChild('imageTemplate') imageTemplate: TemplateRef<any>;
	@ViewChild('dialog') private dialog: any;
	moment = moment;
	@Input() feedItem: IFeedItem;
	discussionChat: IDiscussion;
	hasIframe = false;
	embedCode: any;
	currImage = null;
	messagesCount: number;
	window: Window = window;

	constructor(
		private windowService: NbWindowService,
		private discussionsService: DiscussionsService,
		private dialogService: NbDialogService,
    	private footerService: FooterService,
		private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.getDiscussionChat();
	}

	getDiscussionChat() {
		this.discussionsService.pGetOrCreateForFeedItemChat(this.feedItem.id).subscribe(
			data => this.discussionChat=data)
	}

	getMessagesCount(count: number) {
		this.messagesCount = count;
	}

	scrollToTop() {
		window.scrollTo({top: 0, behavior: 'smooth'});
	}

	scroll(el: HTMLElement) {
		el.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'smooth'});
	}
}
