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

export class SingleExternalFeedComponent implements OnInit {

  feedPost: ISingleExternalFeed;
  constructor(
    private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private ExternalFeedService: ExternalFeedService

  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      data => {
        this.getExternalFeed(data.id);
      }
    );
  }

  getExternalFeed(id) {
    this.ExternalFeedService.pShow(id).subscribe(
      data => {
        this.feedPost = data;
      }
    );
  }

}
