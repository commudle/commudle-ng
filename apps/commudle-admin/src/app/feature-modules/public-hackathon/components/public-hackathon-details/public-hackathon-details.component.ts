import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EModelName, IFaq } from '@commudle/shared-models';
import { FaqService } from '@commudle/shared-services';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
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
  EModelName = EModelName;
  sponsors: IHackathonSponsor[];
  faqs: IFaq[];

  subscriptions: Subscription[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private faqService: FaqService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.getSponsors();
        this.getFaqs();
      }),
    );
  }
  getSponsors() {
    this.subscriptions.push(
      this.hackathonService.indexSponsors(this.hackathon.id).subscribe((data) => {
        this.sponsors = data;
        console.log('🚀 ~ PublicHackathonDetailsComponent ~ this.subscriptions.push ~ data:', data);
      }),
    );
  }
  getFaqs() {
    this.subscriptions.push(
      this.faqService.indexFaqs(this.hackathon.id, EModelName.HACKATHON).subscribe((data) => {
        this.faqs = data;
        console.log('🚀 ~ PublicHackathonDetailsComponent ~ this.subscriptions.push ~ data:', data);
      }),
    );
  }
}
