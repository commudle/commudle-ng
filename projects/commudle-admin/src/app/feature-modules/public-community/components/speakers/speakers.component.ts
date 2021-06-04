import { ActivatedRoute } from "@angular/router";
import { ICommunity } from "./../../../../../../../shared-models/community.model";
import { IUser } from "./../../../../../../../shared-models/user.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommunitiesService } from "projects/commudle-admin/src/app/services/communities.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-speakers",
  templateUrl: "./speakers.component.html",
  styleUrls: ["./speakers.component.scss"],
})
export class SpeakersComponent implements OnInit, OnDestroy {
  speakers: IUser[] = [];
  community: ICommunity;
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitySpeakerService: CommunitiesService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        if (this.community) {
          this.getSpeakerDetails();
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getSpeakerDetails() {
    this.communitySpeakerService
      .speakers(this.community.id)
      .subscribe((data) => {
        this.speakers = data.users;
      });
  }
}
