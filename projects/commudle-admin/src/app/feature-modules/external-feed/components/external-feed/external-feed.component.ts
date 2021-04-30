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
  externalPostsV2 = [];
  page = 1;
  count = 10;
  total;
  isLoading = false;
  canLoadMore = true;
  tags: Array<string> = [];
  tagsMap:any = {};
  tagsChecked = [];

  constructor(
    private feedItemService: FeedItemService,
    private title: Title,
    private meta: Meta, 
  ) {
  }

  ngOnInit() {
    this.setMeta();
    this.getPopularTags();
    this.initTagsMap();
    // this.getFeedPosts();
    this.getFeedPostsV2();
  }

  initTagsMap() {
    for (var x = 0; x<this.tags.length; x++) {
        this.tagsMap[this.tags[x]] = false;
    }
  }
  
  getPopularTags() {
    this.feedItemService.pGetPopularTags().subscribe((value :any)=> {
      let popularTags = value.tags;
      console.log(popularTags);
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
    this.externalPostsV2 = [];
    this.canLoadMore = true;
    this.isLoading = false;
    this.getFeedPostsV2();
  } 

  getFeedPosts(): void{
    this.feedItemService.pGetAll().subscribe(value=> {
      this.externalPosts = value.feed_items;
    });
  }

  getFeedPostsV2(){
    if (!this.isLoading && (!this.total || this.externalPostsV2.length < this.total)) {
      if (this.tagsChecked.length == 0) {      
        this.feedItemService.pGetAllv2(this.page).subscribe((value :any ) =>{
          this.externalPostsV2 = this.externalPostsV2.concat(value.posts);
          this.page += 1;
          this.total = value.total;
          this.isLoading = false;
          if (this.externalPostsV2.length >= this.total) {
            this.canLoadMore = false;
          }
        }
      );
     }
     else {
        this.feedItemService.pGetTagBasedFeed(this.tagsChecked, this.page).subscribe((value :any ) =>{
          this.externalPostsV2 = this.externalPostsV2.concat(value.posts);
          this.page += 1;
          this.total = value.total;
          this.isLoading = false;
          if (this.externalPostsV2.length >= this.total) {
            this.canLoadMore = false;
          }
        }
      );
     }
    }
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
