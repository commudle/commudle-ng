import { Component, OnInit } from '@angular/core';
import { HomeService } from 'projects/commudle-admin/src/app/services/home.service';
import { ISingleExternalFeed } from 'projects/shared-models/single-external-feed.model';

@Component({
  selector: 'app-home-external-feed-links',
  templateUrl: './home-external-feed-links.component.html',
  styleUrls: ['./home-external-feed-links.component.scss']
})
export class HomeExternalFeedLinksComponent implements OnInit {
  
  IFeedItem: ISingleExternalFeed[] = [];

  constructor(
  	private homeService: HomeService) { }

  ngOnInit(): void {
  	this.getFeed();
  }

  getFeed(): void{
    this.homeService.pFeed().subscribe(value=> {
      this.IFeedItem = value.feed_items.slice(0, 3);
    });
  }
}
