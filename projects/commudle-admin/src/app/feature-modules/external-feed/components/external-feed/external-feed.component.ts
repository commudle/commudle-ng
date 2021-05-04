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
  // externalPosts: IFeedItem[] = [];
  externalPosts = [];
  page = 1;
  total;
  canLoadMore = true;
  tags: Array<string> = [];
  tagsMap:any = {};
  tagsChecked = [];
  sortingCriterion = "published_at";

  constructor(
    private feedItemService: FeedItemService,
    private title: Title,
    private meta: Meta
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
   this.tagsMap[tag] = event.target.checked;
   this.tagsChecked = [];
   for(var x in this.tagsMap) {
        if(this.tagsMap[x]) {
            this.tagsChecked.push(x);
        }
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
    this.sortingCriterion = "published_at";
    this.page = 1;
    this.externalPosts = [];
    this.canLoadMore = true;
    this.getFeedPosts();
  }

  getPopularPosts() {
    this.sortingCriterion = "likes";
    this.page = 1;
    this.externalPosts = [];
    this.canLoadMore = true;
    this.getFeedPosts();

  }

  setMeta(): void{
    this.title.setTitle('Feed from Around the World');

    this.meta.updateTag({ name: 'description', content: `Find what more is happening around the world of tech`});


    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'og:title', content: `Feed from Around the World` });
    this.meta.updateTag({ name: 'og:description', content: `Find what more is happening around the world of tech`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `Feed from Around the World` });
    this.meta.updateTag({ name: 'twitter:description', content: `Find what more is happening around the world of tech`});
  }

}
