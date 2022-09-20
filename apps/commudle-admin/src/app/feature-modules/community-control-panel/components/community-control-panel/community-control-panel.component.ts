import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { EmailerComponent } from "../../../../app-shared-components/emailer/emailer.component";
import { CommunitiesService } from "../../../../services/communities.service";
import { ICommunity } from '@commudle/shared-models';
import { EemailTypes } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-community-control-panel',
  templateUrl: './community-control-panel.component.html',
  styleUrls: ['./community-control-panel.component.scss'],
})
export class CommunityControlPanelComponent implements OnInit, OnDestroy {
  community: ICommunity;

  tabs: any[] = [
    {
      title: 'Events',
      route: `./`,
    },
    // {
    //   title: 'Activity',
    //   route: `./notifications`,
    // },
    {
      title: 'Members',
      route: `./members`,
    },
    {
      title: 'Forms',
      route: `./forms`,
    },
    {
      title: 'Team',
      route: `./team`,
    },
    {
      title: 'Edit Details',
      route: `./edit`,
    },
  ];

  constructor(
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute,
    private windowService: NbWindowService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.setCommunity();

    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  setCommunity() {
    this.activatedRoute.params.subscribe(() => {
      let communityId = this.activatedRoute.snapshot.params['community_id'];
      this.communitiesService.getCommunityDetails(communityId).subscribe((data) => {
        this.community = data;
        this.seoService.setTitle(`Admin Dashboard | ${this.community.name}`);
      });
    });
  }

  sendEmails() {
    this.windowService.open(EmailerComponent, {
      title: `Send Email to All ${this.community.member_count} Members`,
      context: {
        community: this.community,
        mailType: EemailTypes.GENERAL_ALL,
      },
    });
  }
}
