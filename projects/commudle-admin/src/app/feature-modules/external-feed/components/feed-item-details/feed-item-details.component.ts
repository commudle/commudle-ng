import {
  Component,
  Input,
  Output,
  OnInit,
  TemplateRef,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { IFeedItem } from "projects/shared-models/feed-item.model";
import { DiscussionsService } from "projects/commudle-admin/src/app/services/discussions.service";
import { IDiscussion } from "projects/shared-models/discussion.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-feed-item-details",
  templateUrl: "./feed-item-details.component.html",
  styleUrls: ["./feed-item-details.component.scss"],
})
export class FeedItemDetailsComponent implements OnInit {
  @Input() feedItem: IFeedItem;
  discussionChat: IDiscussion;

  currImage = null;
  messagesCount: number;

  constructor(
    private discussionsService: DiscussionsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.feedItem.details.created_at = this.datePipe.transform(
      this.feedItem.details.created_at,
      "d MMMM, YYYY"
    );
    this.getDiscussionChat();
  }

  getDiscussionChat() {
    this.discussionsService
      .pGetOrCreateForFeedItemChat(this.feedItem.id)
      .subscribe((data) => (this.discussionChat = data));
  }

  // 	// @Output() sendFlag = new EventEmitter();
  // 	}

  // 	// emitFlag(itemId) {
  // 	// 	console.log("Emitting flag for ");
  // 	// 	console.log(itemId);
  //  //    	this.sendFlag.emit(itemId);
  //  //  	}

  //   	sendFlag(itemId) {
  //   		console.log("Emitting flag for ");
  // 		console.log(itemId);
  //     // this.discussionChatChannel.sendData(
  //     //   this.discussionChatChannel.ACTIONS.FLAG,
  //     //   {
  //     //     feed_item_id: itemId
  //     //   }
  //     // );
  //   }
}
