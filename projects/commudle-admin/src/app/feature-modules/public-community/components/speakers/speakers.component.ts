import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss'],
})
export class SpeakersComponent implements OnInit, OnDestroy {
  speakers: IUser[] = [];
  community: ICommunity;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitySpeakerService: CommunitiesService,
    private title: Title,
    private meta: Meta,
  ) {
    // do nothing
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        if (this.community) {
          this.getSpeakerDetails();
          this.setMeta();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  setMeta(): void {
    this.title.setTitle(`Speakers | ${this.community.name}`);
    this.meta.updateTag({ name: 'og:title', content: `Speakers | ${this.community.name}` });
    this.meta.updateTag({ name: 'twitter:title', content: `Speakers | ${this.community.name}` });
  }

  getSpeakerDetails(): void {
    this.subscriptions.push(
      this.communitySpeakerService.speakers(this.community.id).subscribe((data) => {
        this.speakers = data.users;
      }),
    );
  }
}
