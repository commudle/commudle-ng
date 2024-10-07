import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels, ICommunity } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-public-community-hackathons',
  templateUrl: './public-community-hackathons.component.html',
  styleUrls: ['./public-community-hackathons.component.scss'],
})
export class PublicCommunityHackathonsComponent implements OnInit, OnDestroy {
  EDbModels = EDbModels;
  subscriptions: Subscription[] = [];
  community: ICommunity;
  upcomingHackathons: IHackathon[];
  pastHackathons: IHackathon[];
  moment = moment;
  seoDescription: string;
  constructor(
    private hackathonService: HackathonService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        this.fetchHackathonIndex();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fetchHackathonIndex() {
    this.getUpcomingHackathons();
    this.getPastHackathons();
  }

  getUpcomingHackathons() {
    this.subscriptions.push(
      this.hackathonService.pIndexHackathons(this.community.id, EDbModels.KOMMUNITY, 'future').subscribe((data) => {
        this.upcomingHackathons = data.values;
        this.setSeoService();
      }),
    );
  }

  getPastHackathons() {
    this.subscriptions.push(
      this.hackathonService.pIndexHackathons(this.community.id, EDbModels.KOMMUNITY, 'past').subscribe((data) => {
        this.pastHackathons = data.values;
        this.setSeoService();
      }),
    );
  }

  setSeoService() {
    if (this.upcomingHackathons.length > 0 && this.upcomingHackathons[0].start_date) {
      const startDate = new Date(this.upcomingHackathons[0].start_date);
      const date = startDate.toDateString();
      this.seoDescription =
        'Participate in hackathons by ' +
        this.community.name +
        ' Upcoming hackathon ' +
        this.upcomingHackathons[0].name +
        ' on ' +
        date;
    } else {
      this.seoDescription = 'Participate in hackathons by ' + this.community.name;
    }

    this.seoService.setTags(
      'Hackathons - ' + this.community.name,
      this.seoDescription,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
