import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { IDiscussion } from '@commudle/shared-models';
import { IFeedItem } from '@commudle/shared-models';

@Component({
  selector: 'commudle-feed-item-details',
  templateUrl: './feed-item-details.component.html',
  styleUrls: ['./feed-item-details.component.scss'],
})
export class FeedItemDetailsComponent implements OnInit {
  @Input() feedItem: IFeedItem;

  discussionChat: IDiscussion;

  constructor(private discussionsService: DiscussionsService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.feedItem.details.created_at = this.datePipe.transform(this.feedItem.details.created_at, 'd MMMM, YYYY');
    this.getDiscussionChat();
  }

  getDiscussionChat() {
    this.discussionsService
      .pGetOrCreateForFeedItemChat(this.feedItem.id)
      .subscribe((data) => (this.discussionChat = data));
  }
}
