import { Component, OnInit } from "@angular/core";
import { HomeService } from "projects/commudle-admin/src/app/services/home.service";
import { IFeedItem } from "projects/shared-models/feed-item.model";
import { FeedItemService } from "projects/commudle-admin/src/app/services/feed-items.service";

@Component({
  selector: "app-home-external-feed-links",
  templateUrl: "./home-external-feed-links.component.html",
  styleUrls: ["./home-external-feed-links.component.scss"],
})
export class HomeExternalFeedLinksComponent implements OnInit {
  IFeedItem: IFeedItem[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed(): void {
    this.homeService.pFeed().subscribe((data) => {
      this.IFeedItem = data.feed_items.slice(0, 3);
    });
  }
}
