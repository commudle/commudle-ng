import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFeedItem } from '@commudle/shared-models';
import { FeedItemService } from '../../../../services/feed-items.service';

@Component({
  selector: 'commudle-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
})
export class FeedItemComponent implements OnInit {
  feedItem: IFeedItem;

  constructor(private activatedRoute: ActivatedRoute, private feedItemService: FeedItemService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.getExternalFeed(data.id);
    });
  }

  getExternalFeed(id) {
    this.feedItemService.pShow(id).subscribe((data) => {
      this.feedItem = data;
    });
  }
}
