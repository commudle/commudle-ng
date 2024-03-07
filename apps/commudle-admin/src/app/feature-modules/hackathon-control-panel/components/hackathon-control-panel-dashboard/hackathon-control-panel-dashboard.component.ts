import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { EHackathonStatus, IHackathon } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';
import {
  faArrowLeft,
  faPenToSquare,
  faCircleInfo,
  faLink,
  faCalendarDays,
  faAward,
  faBook,
  faSackDollar,
  faMicrophone,
  faStar,
  faCircleQuestion,
  faArrowsRotate,
  faEye,
  faChartPie,
  faHashtag,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-hackathon-control-panel-dashboard',
  templateUrl: './hackathon-control-panel-dashboard.component.html',
  styleUrls: ['./hackathon-control-panel-dashboard.component.scss'],
})
export class HackathonControlPanelDashboardComponent implements OnInit, OnDestroy {
  hackathon: IHackathon;
  community: ICommunity;
  subscriptions: Subscription[] = [];
  icons = {
    faArrowLeft,
    faPenToSquare,
    faCircleInfo,
    faLink,
    faCalendarDays,
    faAward,
    faMicrophone,
    faBook,
    faSackDollar,
    faStar,
    faCircleQuestion,
    faArrowsRotate,
    faEye,
    faChartPie,
    faHashtag,
    faEnvelope,
  };

  hackathonStatuses: string[] = Object.values(EHackathonStatus);

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitiesService: CommunitiesService,
    private hackathonService: HackathonService,
    private footerService: FooterService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);
    this.footerService.changeMiniFooterStatus(false);
    this.activatedRoute.params.subscribe((params) => {
      const communityId = params['community_id'];
      const hackathonId = params['hackathon_id'];
      this.subscriptions.push(
        this.communitiesService.getCommunityDetails(communityId).subscribe((data) => {
          this.community = data;
        }),
      ),
        this.hackathonService.showHackathon(hackathonId).subscribe((data) => {
          this.hackathon = data;
        });
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
    this.footerService.changeMiniFooterStatus(true);
  }

  updateStatus(value) {
    this.hackathonService.updateHackathonStatus(this.hackathon.id, value).subscribe((data) => {});
  }
}
