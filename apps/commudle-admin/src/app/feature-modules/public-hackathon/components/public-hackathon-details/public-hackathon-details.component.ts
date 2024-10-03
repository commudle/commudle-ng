/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EDbModels,
  EHackathonRegistrationStatus,
  IFaq,
  IHackathonTeam,
  IHackathonTrack,
  IRound,
  ICommunity,
} from '@commudle/shared-models';
import { FaqService, RoundService, SeoService, countries_details } from '@commudle/shared-services';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { HackathonResponseGroupService } from 'apps/commudle-admin/src/app/services/hackathon-response-group.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { IHackathonSponsor } from 'apps/shared-models/hackathon-sponsor';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { faPencil, faAward, faSackDollar, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'commudle-public-hackathon-details',
  templateUrl: './public-hackathon-details.component.html',
  styleUrls: ['./public-hackathon-details.component.scss'],
})
export class PublicHackathonDetailsComponent implements OnInit {
  hackathon: IHackathon;
  community: ICommunity;
  EDbModels = EDbModels;
  sponsors: IHackathonSponsor[];
  faqs: IFaq[];
  tracks: IHackathonTrack[];
  discussionChat: IDiscussion;
  rounds: IRound[];
  countryDetails = countries_details;
  moment = moment;
  userTeamDetails: IHackathonTeam[];
  subscriptions: Subscription[] = [];
  EHackathonRegistrationStatus = EHackathonRegistrationStatus;
  hrgId: number;
  isOrganizer = false;
  icons = {
    faPencil,
    faAward,
    faSackDollar,
    faCircleQuestion,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private faqService: FaqService,
    private discussionsService: DiscussionsService,
    private roundService: RoundService,
    private authWatchService: LibAuthwatchService,
    private hrgService: HackathonResponseGroupService,
    private communitiesService: CommunitiesService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.community = data.community;
        this.getSponsors();
        this.getFaqs();
        this.getTracks();
        this.getDiscussionChat();
        this.getRounds();
        this.isOrganizerCheck();
      }),
    ),
      this.getHackathonResponseGroup();
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.getHackathonCurrentRegistrationDetails();
      }
    }),
      this.checkFragment();
  }

  checkFragment() {
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
    });
  }

  getHackathonResponseGroup() {
    this.hrgService.pShowHackathonResponseGroup(this.hackathon.id).subscribe((data) => {
      if (data) this.hrgId = data.id;
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
        this.setSchema();
      }),
    );
  }

  getTracks() {
    this.subscriptions.push(
      this.hackathonService.pIndexHackathonTracks(this.hackathon.id).subscribe((data) => {
        this.tracks = data;
        if (this.tracks) {
          for (const track of this.tracks) {
            if (track.hackathon_prizes) {
              for (const prize of track.hackathon_prizes) {
                const prizeCurrencySymbol = this.countryDetails.find(
                  (detail) => detail.currency === prize.currency_type,
                );
                prize.currency_symbol = prizeCurrencySymbol.symbol;
              }
            }
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
        .subscribe((data: IHackathonTeam[]) => {
          if (data) {
            this.userTeamDetails = data;
          }
        }),
    );
  }

  isOrganizerCheck() {
    this.subscriptions.push(
      this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
        if (data.find((cSlug) => cSlug.slug === this.community.slug) !== undefined) {
          this.isOrganizer = true;
        } else {
          this.isOrganizer = false;
        }
      }),
    );
  }

  setSchema() {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((faq: { question: string; answer: string }) => {
        return {
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        };
      }),
    };

    this.seoService.setSchema(faqSchema);
  }
}
