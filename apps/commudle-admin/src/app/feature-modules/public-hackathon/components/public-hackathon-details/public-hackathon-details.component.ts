import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels, IFaq, IRound } from '@commudle/shared-models';
import { FaqService, RoundService, countries_details } from '@commudle/shared-services';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { IHackathonSponsor } from 'apps/shared-models/hackathon-sponsor';
import { IHackathonTeam, EHackathonRegistrationStatus } from 'apps/shared-models/hackathon-team.model';
import { IHackathonTrack } from 'apps/shared-models/hackathon-track.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import moment from 'moment';
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
  tracks: IHackathonTrack[];
  discussionChat: IDiscussion;
  rounds: IRound[];
  countryDetails = countries_details;
  moment = moment;
  userTeamDetails: IHackathonTeam;
  subscriptions: Subscription[] = [];
  EHackathonRegistrationStatus = EHackathonRegistrationStatus;
  hrgId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private faqService: FaqService,
    private discussionsService: DiscussionsService,
    private roundService: RoundService,
    private authWatchService: LibAuthwatchService,
    private hrgService: HackathonResponseGroupService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.getSponsors();
        this.getFaqs();
        this.getTracks();
        this.getDiscussionChat();
        this.getRounds();
      }),
    ),
      this.authWatchService.currentUser$.subscribe((currentUser) => {
        if (currentUser) this.getHackathonCurrentRegistrationDetails();
      }),
      this.activatedRoute.fragment.subscribe((fragment) => {
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }
        }
      }),
      this.hrgService.showHackathonResponseGroup(this.hackathon.id).subscribe((data) => {
        this.hrgId = data.id;
      });
  }
  getSponsors() {
    this.subscriptions.push(
      this.hackathonService.pIndexSponsors(this.hackathon.id).subscribe((data) => {
        this.sponsors = data;
      }),
    );
  }
  getFaqs() {
    this.subscriptions.push(
      this.faqService.pIndexFaqs(this.hackathon.id, EDbModels.HACKATHON).subscribe((data) => {
        this.faqs = data;
      }),
    );
  }

  getTracks() {
    this.subscriptions.push(
      this.hackathonService.pIndexHackathonTracks(this.hackathon.id).subscribe((data) => {
        this.tracks = data;
        for (const track of this.tracks) {
          for (const prize of track.hackathon_prizes) {
            const prizeCurrencySymbol = this.countryDetails.find((detail) => detail.currency === prize.currency_type);
            prize.currency_symbol = prizeCurrencySymbol.symbol;
          }
        }
      }),
    );
  }

  getDiscussionChat() {
    this.subscriptions.push(
      this.discussionsService.PublicGetOrCreateForHackathon(this.hackathon.id).subscribe((data) => {
        this.discussionChat = data;
      }),
    );
  }

  getRounds() {
    this.subscriptions.push(
      this.roundService.pIndexRounds(this.hackathon.id, EDbModels.HACKATHON).subscribe((data) => {
        this.rounds = data;
      }),
    );
  }

  getHackathonCurrentRegistrationDetails() {
    this.subscriptions.push(
      this.hackathonService
        .getHackathonCurrentRegistrationDetails(this.hackathon.id)
        .subscribe((data: IHackathonTeam) => {
          if (data) this.userTeamDetails = data;
        }),
    );
  }
}
