import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
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
} from '@fortawesome/free-solid-svg-icons';

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
  };
  isLoading = true;
  showBannerImage = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderVariation();
      }
    });
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.community = data.community;
        this.updateHeaderVariation();
        this.getContactInfo();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
}
