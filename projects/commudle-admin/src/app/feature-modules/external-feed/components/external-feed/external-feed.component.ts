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

  getFeedPosts(): void{
    this.externalFeedService.pGetAll().subscribe(value=> {
      console.log(value);
      this.externalPosts = value.feed_items;
      console.log(this.externalPosts);
    });
  }
}
