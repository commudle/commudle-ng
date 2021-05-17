import { Component, OnInit } from "@angular/core";
import { IFeedItem } from "projects/shared-models/feed-item.model";
import { Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { FeedItemService } from "projects/commudle-admin/src/app/services/feed-items.service";

@Component({
  selector: "app-feed-item",
  templateUrl: "./feed-item.component.html",
  styleUrls: ["./feed-item.component.scss"],
})
export class FeedItemComponent implements OnInit {
  feedItem: IFeedItem;
  constructor(
    private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    private feedItemService: FeedItemService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.getExternalFeed(data.id);
    });
  }

  getExternalFeed(id) {
    this.feedItemService.pShow(id).subscribe((data) => {
      this.feedItem = data;
    });
  }
}
