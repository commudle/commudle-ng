import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';
import { faArrowLeft, faInfoCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-hackathon-control-panel-dashboard',
  templateUrl: './hackathon-control-panel-dashboard.component.html',
  styleUrls: ['./hackathon-control-panel-dashboard.component.scss'],
})
export class HackathonControlPanelDashboardComponent implements OnInit {
  hackathon: IHackathon;
  community: ICommunity;
  subscriptions: Subscription[] = [];
  icons = {
    faArrowLeft,
    faPenToSquare,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private hackathonService: HackathonService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const communityId = params['community_id'];
      const hackathonId = params['hackathon_id'];
      this.subscriptions.push(
        this.communitiesService.getCommunityDetails(communityId).subscribe((data) => {
          this.community = data;
        }),
      ),
        this.hackathonService.fetchHackathon(hackathonId).subscribe((data) => {
          this.hackathon = data;
        });
    });
  }
}
