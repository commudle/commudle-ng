import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { IUser } from 'projects/shared-models/user.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss'],
})
export class SpeakersComponent implements OnInit, OnDestroy {
  speakers: IUser[] = [];
  community: ICommunity;
  speakerLoader = false;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitySpeakerService: CommunitiesService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.speakerLoader = true;
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        if (this.community) {
          this.getSpeakerDetails();
          this.seoService.setTitle(`Speakers | ${this.community.name}`);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getSpeakerDetails(): void {
    this.subscriptions.push(
      this.communitySpeakerService.speakers(this.community.id).subscribe((data) => {
        this.speakers = data.users;
        this.speakerLoader = false;
      }),
    );
  }
}
