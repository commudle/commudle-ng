/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EHackathonRegistrationStatus, ICommunity, IHackathonTeam } from '@commudle/shared-models';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IContactInfo } from 'apps/shared-models/contact-info.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';
import { faLinkedinIn, faTwitter, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faGlobe,
  faInfoCircle,
  faHashtag,
  faStar,
  faSackDollar,
  faCircleQuestion,
  faAward,
  faUser,
  faLaptopCode,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import { SeoService } from '@commudle/shared-services';
import { AuthService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-public-hackathon-homepage',
  templateUrl: './public-hackathon-homepage.component.html',
  styleUrls: ['./public-hackathon-homepage.component.scss'],
})
export class PublicHackathonHomepageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  hackathon: IHackathon;
  community: ICommunity;
  contactInfo: IContactInfo;
  icons = {
    faLinkedinIn,
    faTwitter,
    faFacebookF,
    faGlobe,
    faGithub,
    faInfoCircle,
    faHashtag,
    faStar,
    faSackDollar,
    faCircleQuestion,
    faAward,
    faUser,
    faLaptopCode,
    faArrowTrendUp,
  };
  isLoading = true;
  showBannerImage = false;
  activeFragment: string;
  userTeamDetails: IHackathonTeam[];
  EHackathonRegistrationStatus = EHackathonRegistrationStatus;
  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private router: Router,
    private seoService: SeoService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.checkFragment();
    this.getHackathonAndCommunity();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderVariation();
      }
    });

    this.authService.currentUser$.subscribe((currentUser) => {
      if (currentUser) this.getHackathonCurrentRegistrationDetails();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getHackathonAndCommunity() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.community = data.community;
        this.updateHeaderVariation();
        this.getContactInfo();
        this.setSeoService();
      }),
    );
  }

  checkFragment() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.activeFragment = fragment;
      } else {
        this.activeFragment = '';
      }
    });
  }

  getContactInfo() {
    this.subscriptions.push(
      this.hackathonService.showHackathonContactInfo(this.hackathon.id).subscribe((data) => {
        this.contactInfo = data;
        this.isLoading = false;
      }),
    );
  }
  updateHeaderVariation() {
    const url = this.router.url;
    const value = url.split(this.hackathon.slug)[1];
    if (value) {
      this.showBannerImage = true;
    } else {
      this.showBannerImage = false;
    }
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

  setSeoService() {
    this.seoService.setTags(
      this.hackathon.name + 'by' + this.community.name,
      this.removeHtmlTags(this.hackathon.description),
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  removeHtmlTags(content): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    return doc.body.textContent || '';
  }
}
