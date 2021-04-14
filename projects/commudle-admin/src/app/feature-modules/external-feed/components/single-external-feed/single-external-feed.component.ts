import { Component, OnInit } from '@angular/core';
import { ISingleExternalFeed } from 'projects/shared-models/single-external-feed.model';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SingleExternalFeedService } from 'projects/commudle-admin/src/app/services/external-feeds.service';

@Component({
  selector: 'app-single-extrnal-feed',
  templateUrl: './single-extrnal-feed.component.html',
  styleUrls: ['./single-extrnal-feed.component.scss']
})

export class SingleExtrnalFeedComponent implements OnInit {

  externalFeed: ISingleExternalFeed;
  constructor(
    private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private SingleExternalFeedService: SingleExternalFeedService

  ) { }

  // To Edit according to the feed data
  setMeta() {
    this.meta.updateTag({
      name: 'description',
      content: this.externalFeed.description.replace(/<[^>]*>/g, '')
    });
    this.meta.updateTag(
      {
        name: 'og:image',
        content: `${this.externalFeed.images.length > 0 ? this.externalFeed.images[0].url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag(
      {
        name: 'og:image:secure_url',
        content: `${this.externalFeed.images.length > 0 ? this.externalFeed.images[0].url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag({ name: 'og:title', content: `${this.externalFeed.name} | By ${this.externalFeed.user.name}` });
    this.meta.updateTag({
      name: 'og:description',
      content: this.externalFeed.description.replace(/<[^>]*>/g, '')
    });
    this.meta.updateTag({ name: 'og:type', content: 'website'});

    this.meta.updateTag(
      {
        name: 'twitter:image',
        content: `${this.externalFeed.images.length > 0 ? this.externalFeed.images[0].url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag(
      { name: 'twitter:title', content: `${this.externalFeed.name} | By ${this.externalFeed.user.name}` }
      );

    this.meta.updateTag({
      name: 'twitter:description',
      content: this.externalFeed.description.replace(/<[^>]*>/g, '')
    });
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      data => {
        this.getExternalFeed(data.external_feed_id);
      }
    );
  }

  getExternalFeed(id) {
    this.SingleExternalFeedService.pShow(id).subscribe(
      data => {
        this.externalFeed = data;
        this.title.setTitle(`${this.externalFeed.name} | By ${this.externalFeed.user.name}`);
        this.setMeta();
      }
    );
  }

}
