import { Component, OnInit } from '@angular/core';
import { FeedItemService } from 'apps/commudle-admin/src/app/services/feed-items.service';
 import { SeoService } from 'apps/shared-services/seo.service';
import { IFeedItem } from 'apps/shared-models/feed-item.model';

@Component({
  selector: 'app-external-feed',
  templateUrl: './external-feed.component.html',
  styleUrls: ['./external-feed.component.scss']
})
export class ExternalFeedComponent implements OnInit {
  externalPosts: IFeedItem[] = [];
  page = 1;
  total;
  canLoadMore = true;
  tags: Array<string> = [];
  tagsMap:any = {};
  tagsChecked = [];
  sortingCriterion = "published_at";
  toggleLatestButton = false;
  togglePopularButton = false;

  constructor(
    private feedItemService: FeedItemService,
    private seoService : SeoService
  ) {
  }

  ngOnInit() {
    this.setMeta();
    this.getPopularTags();
    this.initTagsMap();
    this.getFeedPosts();
  }

  initTagsMap() {
    for (var x = 0; x<this.tags.length; x++) {
        this.tagsMap[this.tags[x]] = false;
    }
  }

  getPopularTags() {
    this.feedItemService.pGetPopularTags().subscribe((value :any)=> {
      let popularTags = value.tags;
      for (let index in popularTags) {
        let popularTag = popularTags[index]['tag'];
        this.tags.push(popularTag);
      }
    });
  }

  updateCheckedTags(tag, event) {
    this.page = 1
    if(event.target.checked == true) {
      this.tagsChecked.push(tag);
    }
    else {
      this.tagsChecked = this.tagsChecked.filter(function(checkedTag){
          return checkedTag != tag;
      });
    }
    this.externalPosts = [];
    this.canLoadMore = true;
    this.getFeedPosts();
    }

  getFeedPosts(): void{
    if (!this.total || this.externalPosts.length < this.total) {
      if (this.tagsChecked.length == 0){
        if (this.sortingCriterion == "published_at"){
          this.feedItemService.pGetAll(this.page).subscribe(data=> {
            this.externalPosts = this.externalPosts.concat(data.feed_items);
            this.page += 1
            this.total = data.total;
            if (this.externalPosts.length >= this.total) {
              this.canLoadMore = false;
            }
          });
        }
        else{
          this.feedItemService.pGetPopularFeed(this.page).subscribe(data=> {
            this.externalPosts = this.externalPosts.concat(data.feed_items);
            this.page += 1
            this.total = data.total;
            if (this.externalPosts.length >= this.total) {
              this.canLoadMore = false;
            }
          });
        }

      }
      else{
        this.feedItemService.pGetTagBasedFeed(this.tagsChecked, this.page, this.sortingCriterion).subscribe(data=>{
          this.externalPosts = this.externalPosts.concat(data.feed_items);
            this.page += 1
            this.total = data.total;
            if (this.externalPosts.length >= this.total) {
              this.canLoadMore = false;
            }
        });
      }
    }

  }

  getLatestPosts() {
    this.toggleLatestButton = true;
    if (this.togglePopularButton) {
      this.togglePopularButton = false;
    }
    this.sortingCriterion = "published_at";
    this.page = 1;
    this.externalPosts = [];
    this.canLoadMore = true;
    this.getFeedPosts();
  }

  getPopularPosts() {
    this.togglePopularButton = true;
    if (this.toggleLatestButton) {
      this.toggleLatestButton = false;
    }
    this.sortingCriterion = "likes";
    this.page = 1;
    this.externalPosts = [];
    this.canLoadMore = true;
    this.getFeedPosts();

  }

  setMeta(): void{
    this.seoService.setTags(
      'Feed from Around the World',
      `Find what more is happening around the world of tech`,
      'https://commudle.com/assets/images/commudle-logo192.png'
    );
  }

}
