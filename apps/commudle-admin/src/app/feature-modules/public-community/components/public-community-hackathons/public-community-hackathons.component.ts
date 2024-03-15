import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels, ICommunity } from '@commudle/shared-models';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-public-community-hackathons',
  templateUrl: './public-community-hackathons.component.html',
  styleUrls: ['./public-community-hackathons.component.scss'],
})
export class PublicCommunityHackathonsComponent implements OnInit {
  EDbModels = EDbModels;
  subscriptions: Subscription[] = [];
  community: ICommunity;
  upcomingHackathons: IHackathon[];
  pastHackathons: IHackathon[];
  moment = moment;
  constructor(private hackathonService: HackathonService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        this.fetchHackathonIndex();
      }),
    );
  }

  fetchHackathonIndex() {
    this.hackathonService.pIndexHackathons(this.community.id, EDbModels.KOMMUNITY).subscribe((data) => {
      this.upcomingHackathons = data.upcoming_hackathons;
      this.pastHackathons = data.past_hackathons;
    });
  }
}
