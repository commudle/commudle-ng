import { Component, OnInit } from '@angular/core';
import { ExternalFeedService } from 'projects/commudle-admin/src/app/services/external-feeds.service';
import { Title, Meta } from '@angular/platform-browser';
import { ISingleExternalFeed } from 'projects/shared-models/single-external-feed.model';

@Component({
  selector: 'app-external-feed',
  templateUrl: './external-feed.component.html',
  styleUrls: ['./external-feed.component.scss']
})
export class ExternalFeedComponent implements OnInit {
  externalPosts: ISingleExternalFeed[] = [];
  page = 1;
  count = 10;
  total;
  isLoading = false;
  canLoadMore = true;

  constructor(
    private externalFeedService: ExternalFeedService,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Feed Posts');
  }

  ngOnInit() {
    this.getFeedPosts();
  }

  getFeedPosts() {
    if (!this.isLoading && (!this.total || this.externalPosts.length < this.total)) {
      this.externalFeedService.pGetAll(this.page, this.count).subscribe(
        data => {
          this.externalPosts = this.externalPosts.concat(data.feed_posts);
          this.page += 1;
          this.total = data.total;
          this.isLoading = false;
          if (this.externalPosts.length >= this.total) {
            this.canLoadMore = false;
          }
        }
      );
    }
  }
}
