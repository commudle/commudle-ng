import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { CommunityChannelManagerService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community-channels-dashboard',
  templateUrl: './community-channels-dashboard.component.html',
  styleUrls: ['./community-channels-dashboard.component.scss'],
})
export class CommunityChannelsDashboardComponent implements OnInit, OnDestroy {
  subscriptions = [];

  currentUser: ICurrentUser;
  selectedCommunity: ICommunity;
  communityChannels;
  channelsQueried = false;
  showCommunityList = false;

  constructor(
    private authWatchService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private communityChannelManagerService: CommunityChannelManagerService,
    private seoService : SeoService,
    private footerService: FooterService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.communityChannelManagerService.setCurrentUser(data);
      }),
      this.activatedRoute.params.subscribe((data) => {
        if (!this.selectedCommunity || data.community_id !== this.selectedCommunity.slug) {
          this.selectedCommunity = this.activatedRoute.snapshot.data.community;
          this.setMeta();
          this.communityChannelManagerService.setCommunity(this.selectedCommunity);
        }
      }),
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        this.communityChannels = data;
        if (data) {
          this.channelsQueried = true;
        }
      }),
      this.communityChannelManagerService.showCommunityList$.subscribe((data) => {
        this.showCommunityList = data;
      }),
    );

    this.footerService.changeFooterStatus(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());

    this.footerService.changeFooterStatus(true);
  }

  setMeta() {
    this.seoService.setTags(
      `Channels - ${this.selectedCommunity.name}`,
      `Interact with members in channels for ${this.selectedCommunity.name}! Share knowledge, network & grow together!`,
      this.selectedCommunity.logo_path
    );
  }
}
