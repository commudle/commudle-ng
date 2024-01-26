import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IContactInfo } from 'apps/shared-models/contact-info.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';
import { faLinkedinIn, faTwitter, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faInfoCircle, faHashtag } from '@fortawesome/free-solid-svg-icons';

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
  };
  constructor(private activatedRoute: ActivatedRoute, private hackathonService: HackathonService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.community = data.community;
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
      }),
    );
  }
}
