import { Component, OnInit } from '@angular/core';
import { ISingleExternalFeed } from 'projects/shared-models/single-external-feed.model';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ExternalFeedService } from 'projects/commudle-admin/src/app/services/external-feeds.service';

@Component({
  selector: 'app-single-external-feed',
  templateUrl: './single-external-feed.component.html',
  styleUrls: ['./single-external-feed.component.scss']
})

export class SingleExtrnalFeedComponent implements OnInit {

  externalFeed: ISingleExternalFeed;
  constructor(
    private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private ExternalFeedService: ExternalFeedService

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
        content: `${this.externalFeed.image_url.length > 0 ? this.externalFeed.image_url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag(
      {
        name: 'og:image:secure_url',
        content: `${this.externalFeed.image_url.length > 0 ? this.externalFeed.image_url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag({
      name: 'og:description',
      content: this.externalFeed.description.replace(/<[^>]*>/g, '')
    });
    this.meta.updateTag({ name: 'og:type', content: 'website'});

    this.meta.updateTag(
      {
        name: 'twitter:image',
        content: `${this.externalFeed.image_url.length > 0 ? this.externalFeed.image_url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
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
    this.ExternalFeedService.pShow(id).subscribe(
      data => {
        this.externalFeed = data;
        this.title.setTitle(`${this.externalFeed.title} | By ${this.externalFeed.source}`);
        this.setMeta();
      }
    );
  }

}
