import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels, IFaq } from '@commudle/shared-models';
import { FaqService } from '@commudle/shared-services';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { IHackathonSponsor } from 'apps/shared-models/hackathon-sponsor';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-public-hackathon-details',
  templateUrl: './public-hackathon-details.component.html',
  styleUrls: ['./public-hackathon-details.component.scss'],
})
export class PublicHackathonDetailsComponent implements OnInit {
  hackathon: IHackathon;
  EDbModels = EDbModels;
  sponsors: IHackathonSponsor[];
  faqs: IFaq[];
  discussionChat: IDiscussion;

  subscriptions: Subscription[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private faqService: FaqService,
    private discussionsService: DiscussionsService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.getSponsors();
        this.getFaqs();
        this.getDiscussionChat();
      }),
    );
  }
  getSponsors() {
    this.subscriptions.push(
      this.hackathonService.indexSponsors(this.hackathon.id).subscribe((data) => {
        this.sponsors = data;
      }),
    );
  }
  getFaqs() {
    this.subscriptions.push(
      this.faqService.indexFaqs(this.hackathon.id, EDbModels.HACKATHON).subscribe((data) => {
        this.faqs = data;
      }),
    );
  }

  getDiscussionChat() {
    this.discussionsService.PublicGetOrCreateForHackathon(this.hackathon.id).subscribe((data) => {
      this.discussionChat = data;
    });
  }
}
