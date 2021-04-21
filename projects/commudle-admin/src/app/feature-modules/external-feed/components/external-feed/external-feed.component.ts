import { Component, OnInit } from '@angular/core';
import { FeedItemService } from 'projects/commudle-admin/src/app/services/feed-items.service';
import { Title, Meta } from '@angular/platform-browser';
import { IFeedItem } from 'projects/shared-models/feed-item.model';

@Component({
  selector: 'app-external-feed',
  templateUrl: './external-feed.component.html',
  styleUrls: ['./external-feed.component.scss']
})
export class ExternalFeedComponent implements OnInit {
  externalPosts: IFeedItem[] = [];
  total;
  isLoading = false;
  canLoadMore = true;

  constructor(
    private feedItemService: FeedItemService,
    private title: Title,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.getFeedPosts();
    this.setMeta();
  }

  getFeedPosts(): void{
    this.feedItemService.pGetAll().subscribe(value=> {
      this.externalPosts = value.feed_items;
    });
  }

  setMeta(): void{
    this.title.setTitle('Feed Posts');
  }

}
